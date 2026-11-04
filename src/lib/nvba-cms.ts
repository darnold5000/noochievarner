import type { SupabaseClient } from "@supabase/supabase-js";
import { createServiceClient } from "@/lib/supabase/server";
import { getNvbaTenantId, isNvbaCmsConfigured } from "@/lib/nvba-config";
import { isNvbaTenantRecord } from "@/lib/nvba-tenant";

export const contentTypes = [
  "tournament",
  "tournament_resource",
  "staff",
  "travel_team_coach",
  "business_staff",
  "training_offering",
  "program",
  "facility_section",
  "facility_stat",
  "homepage",
  "site_settings",
  "instructor",
  "lesson",
  "membership_display",
  "pro_shop_vendor",
  "pro_shop_settings",
  "nvba_service",
  "about_settings",
  "facility_settings",
  "facility_feature",
  "contact_settings",
  "contact_topic",
  "gallery_photo",
  "news_article",
  "sponsor",
  "services_intro",
] as const;

export type ContentType = (typeof contentTypes)[number];

export type ContentItem = {
  id: string;
  tenant_id: string;
  content_type: ContentType;
  slug: string;
  title: string;
  data: Record<string, unknown>;
  published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export async function listContent(db: SupabaseClient, tenantId: string, contentType?: ContentType) {
  let query = db
    .from("tenant_content_items")
    .select("*")
    .eq("tenant_id", tenantId)
    .order("sort_order", { ascending: true })
    .order("updated_at", { ascending: false });

  if (contentType) query = query.eq("content_type", contentType);
  return query;
}

export async function saveContent(
  db: SupabaseClient,
  tenantId: string,
  input: {
    id?: string;
    content_type: ContentType;
    slug: string;
    title: string;
    data: Record<string, unknown>;
    published: boolean;
    sort_order: number;
  },
) {
  if (input.id) {
    return db
      .from("tenant_content_items")
      .update({
        content_type: input.content_type,
        slug: input.slug,
        title: input.title,
        data: input.data,
        published: input.published,
        sort_order: input.sort_order,
      })
      .eq("id", input.id)
      .eq("tenant_id", tenantId)
      .select()
      .single();
  }

  return db
    .from("tenant_content_items")
    .insert({ ...input, tenant_id: tenantId })
    .select()
    .single();
}

export async function deleteContent(db: SupabaseClient, tenantId: string, id: string) {
  return db.from("tenant_content_items").delete().eq("id", id).eq("tenant_id", tenantId);
}

export function dataString(data: Record<string, unknown>, key: string) {
  const value = data[key];
  return typeof value === "string" ? value : "";
}

/** CMS media URL: use fallback only when the field was never set; empty string means owner removed the upload. */
export function resolveCmsMediaUrl(data: Record<string, unknown>, key: string, fallback: string) {
  if (!(key in data)) return fallback;
  return dataString(data, key);
}

/** CMS URL field: empty string falls back to default (e.g. facility video). */
export function resolveCmsUrlWithDefault(data: Record<string, unknown>, key: string, fallback: string) {
  if (!(key in data)) return fallback;
  const value = dataString(data, key);
  return value || fallback;
}

export function dataBoolean(data: Record<string, unknown>, key: string) {
  return data[key] === true;
}

export function dataStringList(data: Record<string, unknown>, key: string) {
  return Array.isArray(data[key])
    ? data[key].filter((value): value is string => typeof value === "string" && Boolean(value.trim()))
    : [];
}

export type PublicContentState = {
  published: ContentItem[];
  managedSlugs: string[];
  cmsManaged: boolean;
};

export async function getPublicContentState(contentType: ContentType): Promise<PublicContentState> {
  if (!isNvbaCmsConfigured()) return { published: [], managedSlugs: [], cmsManaged: false };
  try {
    const db = createServiceClient();
    const tenantId = getNvbaTenantId();
    const { data: tenant } = await db.from("tenants").select("slug, display_name").eq("id", tenantId).maybeSingle();
    if (!isNvbaTenantRecord(tenant)) return { published: [], managedSlugs: [], cmsManaged: false };
    const { data } = await db
      .from("tenant_content_items")
      .select("*")
      .eq("tenant_id", tenantId)
      .eq("content_type", contentType)
      .order("sort_order", { ascending: true });
    const items = (data ?? []) as ContentItem[];
    return {
      published: items.filter((item) => item.published),
      managedSlugs: items.map((item) => item.slug),
      cmsManaged: items.some((item) => item.data.cmsManaged === true),
    };
  } catch {
    return { published: [], managedSlugs: [], cmsManaged: false };
  }
}

export async function listPublishedContent(contentType: ContentType): Promise<ContentItem[]> {
  return (await getPublicContentState(contentType)).published;
}

export async function getPublishedSingleton(contentType: ContentType): Promise<ContentItem | null> {
  const items = await listPublishedContent(contentType);
  return items[0] ?? null;
}
