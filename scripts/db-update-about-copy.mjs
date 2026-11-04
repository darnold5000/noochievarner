/**
 * Push refreshed About page copy into existing CMS rows (seed only inserts new records).
 *
 *   npm run db:update-about-copy
 */
import { createClient } from "@supabase/supabase-js";
import { ABOUT, FACILITY_FEATURES } from "./nvba-cms-seed-data.mjs";
import { loadEnvLocal } from "./load-env.mjs";

loadEnvLocal();

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
const tenantId = process.env.TENANT_ID?.trim();
if (!url || !key || !tenantId) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, or TENANT_ID.");
}

class DisabledWebSocket {}
const db = createClient(url, key, {
  auth: { persistSession: false, autoRefreshToken: false },
  realtime: { transport: DisabledWebSocket },
});

const { data: aboutRow, error: aboutError } = await db
  .from("tenant_content_items")
  .select("id, data")
  .eq("tenant_id", tenantId)
  .eq("content_type", "about_settings")
  .eq("slug", "about")
  .maybeSingle();

if (aboutError) throw new Error(aboutError.message);
if (!aboutRow) {
  console.log("No about_settings row found — run npm run db:seed-cms first.");
  process.exit(1);
}

const nextAboutData = {
  ...(aboutRow.data ?? {}),
  introEyebrow: ABOUT.introEyebrow,
  introTitle: ABOUT.introTitle,
  introText: ABOUT.introText,
  storyParagraphs: ABOUT.storyParagraphs,
  founderHomeSummary: ABOUT.founderHomeSummary,
  founderCareerPosterUrl: ABOUT.founderCareerPosterUrl,
  founderTestimonialsFlyerUrl: ABOUT.founderTestimonialsFlyerUrl,
  testimonialBradName: ABOUT.testimonialBradName,
  testimonialBradTitle: ABOUT.testimonialBradTitle,
  testimonialBradQuote: ABOUT.testimonialBradQuote,
  testimonialMacName: ABOUT.testimonialMacName,
  testimonialMacTitle: ABOUT.testimonialMacTitle,
  testimonialMacQuote: ABOUT.testimonialMacQuote,
};

const { error: updateAboutError } = await db
  .from("tenant_content_items")
  .update({ data: nextAboutData })
  .eq("id", aboutRow.id)
  .eq("tenant_id", tenantId);

if (updateAboutError) throw new Error(updateAboutError.message);

const { data: featureRows, error: featureListError } = await db
  .from("tenant_content_items")
  .select("id, slug, data")
  .eq("tenant_id", tenantId)
  .eq("content_type", "facility_feature");

if (featureListError) throw new Error(featureListError.message);

let featuresUpdated = 0;
for (const feature of FACILITY_FEATURES) {
  const row = (featureRows ?? []).find((item) => item.slug === feature.slug);
  if (!row) continue;
  const { error } = await db
    .from("tenant_content_items")
    .update({
      title: feature.label,
      data: {
        ...(row.data ?? {}),
        label: feature.label,
        description: feature.description,
        sortOrderDisplay: String(feature.sort),
      },
      sort_order: feature.sort,
    })
    .eq("id", row.id)
    .eq("tenant_id", tenantId);
  if (error) throw new Error(error.message);
  featuresUpdated += 1;
}

console.log(`Updated about_settings and ${featuresUpdated} facility feature row(s) for tenant ${tenantId}.`);
