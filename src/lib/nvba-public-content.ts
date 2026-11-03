import type { BookingKey } from "@/config/booking";
import { bookingUrl } from "@/config/booking";
import { COACHES, type Coach } from "@/config/schedule";
import {
  CAMPS,
  CONTACT_TOPICS,
  GALLERY,
  LESSONS,
  MEMBERSHIP,
  PRO_SHOP,
  SERVICES,
  SERVICES_FACILITY_IMAGE,
  SERVICES_INTRO,
  SITE,
  SPONSORS,
  SPONSORS_INTRO,
  STORES,
  type ContactTopic,
  type FacilityService,
  type Offering,
  type Sponsor,
} from "@/content/site";
import {
  dataString,
  dataStringList,
  getPublicContentState,
  getPublishedSingleton,
  type ContentItem,
} from "@/lib/nvba-cms";

function programToOffering(item: ContentItem): Offering {
  const data = item.data;
  const bookingKey = dataString(data, "bookingKey") as BookingKey;
  const registrationEnabled = dataString(data, "registrationEnabled") !== "no";
  let sections: Offering["sections"];
  const sectionsJson = dataString(data, "sectionsJson");
  if (sectionsJson) {
    try {
      const parsed = JSON.parse(sectionsJson) as Offering["sections"];
      if (Array.isArray(parsed)) sections = parsed;
    } catch {
      sections = undefined;
    }
  }
  return {
    slug: item.slug,
    name: item.title,
    eyebrow: dataString(data, "eyebrow") || "Program",
    summary: dataString(data, "summary"),
    ages: dataString(data, "ages") || undefined,
    dates: dataString(data, "dates") || undefined,
    days: dataString(data, "days") || undefined,
    times: dataString(data, "times") || undefined,
    price: dataString(data, "price") || undefined,
    instructor: dataString(data, "instructor") || undefined,
    limit: dataString(data, "capacity") || undefined,
    details: dataStringList(data, "details").length ? dataStringList(data, "details") : dataStringList(data, "trainingTopics"),
    sections,
    bookingKey: registrationEnabled && bookingKey ? bookingKey : undefined,
    cta: dataString(data, "cta") || "Register",
    image: dataString(data, "flyerUrl") || undefined,
    imageAlt: item.title,
  };
}

export async function getPublicCamps(): Promise<Offering[]> {
  const state = await getPublicContentState("program");
  const cmsItems = state.published.map(programToOffering);
  if (state.cmsManaged) return cmsItems.sort((a, b) => a.name.localeCompare(b.name));
  const managed = new Set(state.managedSlugs);
  const fallback = CAMPS.filter((camp) => !managed.has(camp.slug));
  return [...cmsItems, ...fallback];
}

export async function getPublicCampBySlug(slug: string): Promise<Offering | undefined> {
  const camps = await getPublicCamps();
  return camps.find((camp) => camp.slug === slug);
}

export async function getPublicCampSlugs(): Promise<string[]> {
  const camps = await getPublicCamps();
  return camps.map((camp) => camp.slug);
}

export async function getPublicLessons(): Promise<(typeof LESSONS)[number][]> {
  const state = await getPublicContentState("lesson");
  const staticBySlug = new Map<string, (typeof LESSONS)[number]>(
    LESSONS.map((lesson) => [lesson.slug, lesson]),
  );
  const cms = state.published.map((item) => {
    const data = item.data;
    const fallback = staticBySlug.get(item.slug);
    const bookingKey = (dataString(data, "bookingKey") || fallback?.bookingKey) as BookingKey;
    return {
      slug: item.slug,
      name: item.title,
      coach: dataString(data, "instructorName") || fallback?.coach || "NVBA instructor",
      role: dataString(data, "category") || fallback?.role || "",
      bio: dataString(data, "description") || fallback?.bio || "",
      focus: (dataStringList(data, "focusAreas").length
        ? dataStringList(data, "focusAreas")
        : fallback?.focus ?? []) as unknown as readonly string[],
      bookingKey,
      image:
        dataString(data, "imageUrl") ||
        ("image" in (fallback ?? {}) ? (fallback as { image?: string }).image : undefined),
      imageAlt:
        ("imageAlt" in (fallback ?? {})
          ? (fallback as { imageAlt?: string }).imageAlt
          : undefined) ?? item.title,
      contact:
        ("contact" in (fallback ?? {})
          ? (fallback as { contact?: readonly string[] }).contact
          : undefined) ?? ([] as readonly string[]),
    };
  }) as (typeof LESSONS)[number][];
  if (state.cmsManaged) return cms;
  if (!state.published.length) return [...LESSONS];
  const managed = new Set(state.managedSlugs);
  return [...cms, ...LESSONS.filter((lesson) => !managed.has(lesson.slug))];
}

export async function getLessonsPageCoaches(): Promise<Coach[]> {
  const instructorState = await getPublicContentState("instructor");
  return COACHES.map((coach) => {
    const cms = instructorState.published.find(
      (item) => dataString(item.data, "coachId") === coach.id || item.slug === coach.id,
    );
    if (!cms) return coach;
    const data = cms.data;
    const contact = [dataString(data, "phone"), dataString(data, "email")].filter(Boolean);
    return {
      ...coach,
      name: cms.title || coach.name,
      specialty: dataString(data, "title") || coach.specialty,
      shortBio: dataString(data, "shortBio") || dataString(data, "fullBio") || coach.shortBio,
      photo: dataString(data, "photoUrl") || coach.photo,
      contact: contact.length ? contact : coach.contact,
    };
  });
}

export async function getPublicSponsors(): Promise<Sponsor[]> {
  const state = await getPublicContentState("sponsor");
  const cms = state.published.map((item) => ({
    name: item.title,
    note: dataString(item.data, "shortDescription"),
    image: dataString(item.data, "logoUrl") || "/images/sponsors/placeholder.jpg",
    imageAlt: item.title,
    href: dataString(item.data, "websiteUrl") || "#",
    cta: dataString(item.data, "cta") || "Visit sponsor",
  }));
  if (state.cmsManaged) return cms;
  const managed = new Set(state.managedSlugs);
  return [...cms, ...SPONSORS.filter((s) => !managed.has(slugify(s.name)))];
}

function slugify(value: string) {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export async function getPublicSponsorsIntro() {
  const settings = await getPublishedSingleton("site_settings");
  const intro = settings ? dataString(settings.data, "sponsorsIntro") : "";
  return intro || SPONSORS_INTRO;
}

export async function getPublicGallery() {
  const state = await getPublicContentState("gallery_photo");
  const cms = state.published
    .map((item) => ({
      src: dataString(item.data, "photoUrl"),
      alt: dataString(item.data, "caption") || item.title,
      caption: dataString(item.data, "caption") || item.title,
    }))
    .filter((photo) => photo.src);
  if (state.cmsManaged) return cms;
  if (cms.length) return cms;
  return [...GALLERY];
}

export async function getPublicServices(): Promise<FacilityService[]> {
  const state = await getPublicContentState("nvba_service");
  const cms = state.published.map((item) => {
    const ratesRaw = dataStringList(item.data, "rates");
    const rates = ratesRaw
      .map((line) => {
        const [label, price] = line.split("|").map((part) => part.trim());
        return label && price ? { label, price } : null;
      })
      .filter((rate): rate is { label: string; price: string } => Boolean(rate));
    return {
      name: item.title,
      lead: dataString(item.data, "shortDescription") || undefined,
      detail: dataString(item.data, "fullDescription") || undefined,
      bullets: dataStringList(item.data, "bullets"),
      rates: rates.length ? rates : undefined,
      price: dataString(item.data, "displayPrice") || undefined,
      contact: dataString(item.data, "contactOnly") === "yes",
    } satisfies FacilityService;
  });
  if (state.cmsManaged) return cms;
  const managed = new Set(state.managedSlugs);
  return [...cms, ...SERVICES.filter((service) => !managed.has(slugify(service.name)))];
}

export async function getPublicServicesIntro() {
  const introItem = await getPublishedSingleton("services_intro");
  if (introItem && dataString(introItem.data, "servicesIntro")) {
    return {
      intro: dataString(introItem.data, "servicesIntro"),
      image: {
        src: dataString(introItem.data, "facilityImageUrl") || SERVICES_FACILITY_IMAGE.src,
        alt: dataString(introItem.data, "facilityImageAlt") || SERVICES_FACILITY_IMAGE.alt,
      },
    };
  }
  return { intro: SERVICES_INTRO, image: SERVICES_FACILITY_IMAGE };
}

export async function getPublicMembership() {
  const item = await getPublishedSingleton("membership_display");
  if (!item) return MEMBERSHIP;
  const data = item.data;
  return {
    name: item.title || MEMBERSHIP.name,
    term: dataString(data, "term") || MEMBERSHIP.term,
    annual: dataString(data, "displayAnnualPrice") || MEMBERSHIP.annual,
    monthly: dataString(data, "displayMonthlyPrice") || MEMBERSHIP.monthly,
    initiation: dataString(data, "displayInitiationFee") || MEMBERSHIP.initiation,
    includes: dataStringList(data, "benefits").length ? dataStringList(data, "benefits") : [...MEMBERSHIP.includes],
  };
}

export async function getPublicContactTopics(): Promise<readonly { value: ContactTopic; label: string }[]> {
  const state = await getPublicContentState("contact_topic");
  const cms = state.published.map((item) => ({
    value: (dataString(item.data, "value") || item.slug) as ContactTopic,
    label: item.title,
  }));
  if (state.cmsManaged && cms.length) return cms;
  const managed = new Set(state.managedSlugs);
  return [...cms, ...CONTACT_TOPICS.filter((topic) => !managed.has(topic.value))];
}

export type ResolvedSiteContact = {
  phone: string;
  phoneHref: string;
  email: string;
  emailHref: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    full: string;
    mapUrl: string;
    directionsUrl: string;
    mapEmbedUrl: string;
  };
  tagline: string;
  social: { label: string; href: string }[];
  name: string;
};

export async function getResolvedSiteContact(): Promise<ResolvedSiteContact> {
  const [settings, contact] = await Promise.all([
    getPublishedSingleton("site_settings"),
    getPublishedSingleton("contact_settings"),
  ]);
  const settingsData = settings?.data ?? {};
  const contactData = contact?.data ?? {};
  const phone = dataString(contactData, "phone") || dataString(settingsData, "phone") || SITE.phone;
  const email = dataString(contactData, "email") || dataString(settingsData, "email") || SITE.email;
  const street = dataString(contactData, "street") || SITE.address.street;
  const city = dataString(contactData, "city") || SITE.address.city;
  const stateCode = dataString(contactData, "state") || SITE.address.state;
  const zip = dataString(contactData, "zip") || SITE.address.zip;
  const full = [street, `${city}, ${stateCode} ${zip}`].filter(Boolean).join(", ");
  const mapsUrl = dataString(contactData, "mapsUrl") || SITE.address.mapUrl;
  return {
    name: dataString(settingsData, "academyName") || SITE.name,
    tagline: dataString(settingsData, "tagline") || SITE.tagline,
    phone,
    phoneHref: phone.replace(/\D/g, "").length >= 10 ? `tel:+1${phone.replace(/\D/g, "").slice(-10)}` : SITE.phoneHref,
    email,
    emailHref: `mailto:${email}`,
    address: {
      street,
      city,
      state: stateCode,
      zip,
      full,
      mapUrl: mapsUrl,
      directionsUrl: SITE.address.directionsUrl,
      mapEmbedUrl: SITE.address.mapEmbedUrl,
    },
    social: [
      { label: "Facebook", href: dataString(contactData, "facebook") || dataString(settingsData, "facebook") || SITE.social[0]?.href || "" },
      { label: "X", href: dataString(contactData, "x") || dataString(settingsData, "x") || SITE.social[1]?.href || "" },
      { label: "YouTube", href: dataString(contactData, "youtube") || dataString(settingsData, "youtube") || SITE.social[2]?.href || "" },
      { label: "Instagram", href: dataString(contactData, "instagram") || dataString(settingsData, "instagram") || SITE.social[3]?.href || "" },
    ].filter((item) => item.href),
  };
}

export type SiteBranding = ResolvedSiteContact & {
  shortName: string;
  footerDescription: string;
  logoUrl: string;
  headerTitle: string;
  headerSubtitle: string;
};

export async function getSiteBranding(): Promise<SiteBranding> {
  const contact = await getResolvedSiteContact();
  const settings = await getPublishedSingleton("site_settings");
  const settingsData = settings?.data ?? {};
  return {
    ...contact,
    shortName: dataString(settingsData, "shortName") || SITE.shortName,
    footerDescription: dataString(settingsData, "footerDescription") || contact.tagline,
    logoUrl: dataString(settingsData, "logoUrl") || "/images/brand/icon.png",
    headerTitle: "NOOCHIE VARNER",
    headerSubtitle: "BASEBALL ACADEMY",
  };
}

export type PublicAboutContent = {
  introEyebrow: string;
  introTitle: string;
  introText: string;
  storyParagraphs: string[];
  mainImageUrl: string;
  secondaryImageUrl: string;
  facilityVideoUrl: string;
  facilityDescription: string;
  features: { label: string; description: string }[];
  contact: ResolvedSiteContact;
};

export async function getPublicAboutContent(): Promise<PublicAboutContent | null> {
  const [about, featuresState, contact] = await Promise.all([
    getPublishedSingleton("about_settings"),
    getPublicContentState("facility_feature"),
    getResolvedSiteContact(),
  ]);
  if (!about) return null;
  const data = about.data;
  const storyParagraphs = dataStringList(data, "storyParagraphs");
  return {
    introEyebrow: dataString(data, "introEyebrow") || "Georgetown, Kentucky",
    introTitle: dataString(data, "introTitle") || "About the Academy",
    introText: dataString(data, "introText"),
    storyParagraphs: storyParagraphs.length
      ? storyParagraphs
      : [dataString(data, "story"), dataString(data, "mission"), dataString(data, "ownerBio")].filter(Boolean),
    mainImageUrl: dataString(data, "mainImageUrl") || "/images/facility/facility.jpg",
    secondaryImageUrl: dataString(data, "secondaryImageUrl") || "/images/facility/about-2.jpg",
    facilityVideoUrl: dataString(data, "facilityVideoUrl") || SITE.facilityVideo,
    facilityDescription: dataString(data, "facilityDescription") || SITE.facility,
    features: featuresState.published.map((item) => ({
      label: dataString(item.data, "label") || item.title,
      description: dataString(item.data, "description"),
    })),
    contact,
  };
}

export type PublicProShopContent = {
  hero: {
    label: string;
    lines: readonly [string, string];
    subtitle: string;
    highlights: readonly string[];
    image: string;
    imageAlt: string;
  };
  wilson: {
    brand: string;
    tagline: string;
    heading: string;
    description: string;
    image: string;
    imageAlt: string;
    href: string;
    accessCode: string;
    cta: string;
  };
  apparel: {
    heading: string;
    description: string;
    image: string;
    imageAlt: string;
    href: string;
    cta: string;
    options: readonly string[];
  };
  orderSteps: readonly string[];
  catalogContact: {
    name: string;
    role: string;
    email: string;
    emailHref: string;
    phone: string;
    phoneHref: string;
  };
};

function vendorByKind(vendors: ContentItem[], kind: string, slug: string) {
  return vendors.find((item) => item.slug === slug || dataString(item.data, "vendorKind") === kind);
}

export async function getPublicProShopContent(): Promise<PublicProShopContent> {
  const [page, vendorState] = await Promise.all([
    getPublishedSingleton("pro_shop_settings"),
    getPublicContentState("pro_shop_vendor"),
  ]);
  const base = PRO_SHOP;
  const pageData = page?.data ?? {};
  const vendors = vendorState.published;
  const wilsonItem = vendorByKind(vendors, "wilson", "wilson");
  const apparelItem = vendorByKind(vendors, "apparel", "nvba-apparel");

  const contactName = dataString(pageData, "contactName") || STORES.catalogContact.name;
  const contactEmail = dataString(pageData, "contactEmail") || STORES.catalogContact.email;
  const contactPhone = dataString(pageData, "contactPhone") || STORES.catalogContact.phone;

  const heroLine1 = dataString(pageData, "heroLine1") || base.hero.lines[0];
  const heroLine2 = dataString(pageData, "heroLine2") || base.hero.lines[1];
  const highlights = dataStringList(pageData, "heroHighlights");

  return {
    hero: {
      label: dataString(pageData, "heroLabel") || base.hero.label,
      lines: [heroLine1, heroLine2] as [string, string],
      subtitle: dataString(pageData, "pageDescription") || base.hero.subtitle,
      highlights: (highlights.length ? highlights : [...base.hero.highlights]) as readonly string[],
      image: dataString(pageData, "heroImageUrl") || base.hero.image,
      imageAlt: base.hero.imageAlt,
    },
    wilson: wilsonItem
      ? {
          ...base.wilson,
          tagline: dataString(wilsonItem.data, "tagline") || base.wilson.tagline,
          heading: wilsonItem.title || base.wilson.heading,
          description: dataString(wilsonItem.data, "description") || base.wilson.description,
          image: dataString(wilsonItem.data, "logoUrl") || base.wilson.image,
          href: dataString(wilsonItem.data, "catalogUrl") || base.wilson.href,
          accessCode: dataString(wilsonItem.data, "accessCode") || base.wilson.accessCode,
          cta: dataString(wilsonItem.data, "cta") || base.wilson.cta,
        }
      : base.wilson,
    apparel: apparelItem
      ? {
          ...base.apparel,
          heading: apparelItem.title === "NVBA Apparel" ? base.apparel.heading : apparelItem.title,
          description: dataString(apparelItem.data, "description") || base.apparel.description,
          image: dataString(apparelItem.data, "logoUrl") || base.apparel.image,
          href: dataString(apparelItem.data, "catalogUrl") || base.apparel.href,
          cta: dataString(apparelItem.data, "cta") || base.apparel.cta,
          options: (dataStringList(apparelItem.data, "apparelOptions").length
            ? dataStringList(apparelItem.data, "apparelOptions")
            : [...base.apparel.options]) as readonly string[],
        }
      : base.apparel,
    orderSteps: (dataStringList(pageData, "orderSteps").length
      ? dataStringList(pageData, "orderSteps")
      : [...base.orderSteps]) as readonly string[],
    catalogContact: {
      name: contactName,
      role: dataString(pageData, "contactRole") || STORES.catalogContact.role,
      email: contactEmail,
      emailHref: `mailto:${contactEmail}`,
      phone: contactPhone,
      phoneHref: STORES.catalogContact.phoneHref,
    },
  };
}

/** @deprecated Use getPublicProShopContent */
export async function getPublicProShop() {
  return getPublicProShopContent();
}

export async function getHomepageContent() {
  const item = await getPublishedSingleton("homepage");
  if (!item) return null;
  return item.data;
}

export async function getFeaturedHomeCamps(): Promise<Offering[]> {
  const camps = await getPublicCamps();
  const state = await getPublicContentState("program");
  const featuredSlugs = new Set(
    state.published.filter((item) => dataString(item.data, "featuredOnHomepage") === "yes").map((item) => item.slug),
  );
  if (featuredSlugs.size) return camps.filter((camp) => featuredSlugs.has(camp.slug));
  return camps;
}

export async function getFeaturedHomeLessons() {
  const lessons = await getPublicLessons();
  const state = await getPublicContentState("lesson");
  const featured = state.published.filter((item) => dataString(item.data, "featuredOnHomepage") === "yes");
  if (featured.length) {
    const slugs = featured.map((item) => item.slug);
    return lessons.filter((lesson) => slugs.includes(lesson.slug)).slice(0, 2);
  }
  return lessons.slice(0, 2);
}

export async function getPublicNewsArticles() {
  const state = await getPublicContentState("news_article");
  return state.published.map((item) => ({
    slug: item.slug,
    headline: item.title,
    summary: dataString(item.data, "summary"),
    body: dataString(item.data, "body"),
    image: dataString(item.data, "featuredImageUrl") || "/images/brand/college-alumni.png",
    publicationDate: dataString(item.data, "publicationDate"),
  }));
}

export async function getFeaturedHomeSponsors(): Promise<Sponsor[]> {
  const sponsors = await getPublicSponsors();
  const state = await getPublicContentState("sponsor");
  const featured = state.published.filter((item) => dataString(item.data, "featuredOnHomepage") === "yes");
  if (featured.length) {
    const names = new Set(featured.map((item) => item.title));
    const filtered = sponsors.filter((s) => names.has(s.name));
    if (filtered.length) return filtered;
  }
  return sponsors.slice(0, 1);
}

export function resolveBookingHref(key?: BookingKey) {
  if (!key) return bookingUrl("noochieHitting");
  return bookingUrl(key);
}
