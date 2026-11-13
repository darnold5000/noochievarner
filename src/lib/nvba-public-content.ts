import type { BookingKey } from "@/config/booking";
import { bookingUrl } from "@/config/booking";
import { COACHES, type Coach } from "@/config/schedule";
import {
  DEFAULT_REGISTRATIONS_SECTION_DESCRIPTION,
  FALLBACK_HITTRAX_LEAGUES,
  type HitTraxLeague,
} from "@/content/hittrax-leagues";
import {
  CAMPS,
  CONTACT_TOPICS,
  GALLERY,
  LESSONS,
  MEMBERSHIP,
  SERVICES,
  SERVICES_FACILITY_IMAGE,
  SERVICES_INTRO,
  SITE,
  SPONSORS,
  SPONSORS_INTRO,
  type ContactTopic,
  type FacilityService,
  type Offering,
  type Sponsor,
} from "@/content/site";
import { NV_STARS_PHOTOS, NV_STARS_TEAM_GRID_SLUGS } from "@/content/nv-stars";
import {
  FOUNDER_BIO_SECTIONS,
  FOUNDER_CAREER_POSTER,
  FOUNDER_CAREER_STATS,
  FOUNDER_HOME_SUMMARY,
  FOUNDER_PHOTO,
  FOUNDER_TESTIMONIALS,
  FOUNDER_TESTIMONIALS_FLYER,
} from "@/content/founder";
import { isNvbaCmsConfigured } from "@/lib/nvba-config";
import {
  dataString,
  dataStringList,
  getPublicContentState,
  getPublishedSingleton,
  resolveCmsMediaUrl,
  resolveCmsUrlWithDefault,
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

const NV_STARS_GALLERY_CATEGORIES = new Set(["nv-stars-team", "nv-stars-news"]);

function isNvStarsGalleryCategory(category: string) {
  return NV_STARS_GALLERY_CATEGORIES.has(category);
}

function mapNvStarsGalleryItem(item: { slug: string; title: string; data: Record<string, unknown>; sort_order: number }) {
  const category = dataString(item.data, "category");
  if (!isNvStarsGalleryCategory(category)) return null;
  const src = dataString(item.data, "photoUrl");
  if (!src) return null;
  const teamLabel = dataString(item.data, "teamLabel");
  const season = dataString(item.data, "season");
  return {
    slug: item.slug,
    src,
    alt: dataString(item.data, "caption") || item.title,
    caption: dataString(item.data, "caption"),
    category: category as "nv-stars-team" | "nv-stars-news",
    teamLabel: teamLabel || undefined,
    season: season || undefined,
    featuredOnHomepage: dataString(item.data, "featured") === "yes",
    sort: Number(dataString(item.data, "sortOrderDisplay")) || item.sort_order,
  };
}

async function getNvStarsGalleryRecords() {
  const state = await getPublicContentState("gallery_photo");
  const fromCms = state.published
    .map((item) => mapNvStarsGalleryItem(item))
    .filter((item): item is NonNullable<typeof item> => Boolean(item))
    .sort((a, b) => a.sort - b.sort);
  if (fromCms.length) return fromCms;
  return [...NV_STARS_PHOTOS];
}

export type NvStarsPublicPhoto = {
  src: string;
  alt: string;
  caption: string;
  teamLabel?: string;
  season?: string;
};

const NV_STARS_TEAM_GRID_SLUG_SET = new Set<string>(NV_STARS_TEAM_GRID_SLUGS);

function isNvStarsTeamGridPhoto(item: { slug: string; category: string }) {
  return item.category === "nv-stars-team" || NV_STARS_TEAM_GRID_SLUG_SET.has(item.slug);
}

function nvStarsTeamGridOrder(a: { slug: string; sort: number }, b: { slug: string; sort: number }) {
  const aLead = NV_STARS_TEAM_GRID_SLUGS.indexOf(a.slug as (typeof NV_STARS_TEAM_GRID_SLUGS)[number]);
  const bLead = NV_STARS_TEAM_GRID_SLUGS.indexOf(b.slug as (typeof NV_STARS_TEAM_GRID_SLUGS)[number]);
  if (aLead >= 0 && bLead >= 0) return aLead - bLead;
  if (aLead >= 0) return -1;
  if (bLead >= 0) return 1;
  return a.sort - b.sort;
}

export async function getPublicNvStarsTeams(): Promise<NvStarsPublicPhoto[]> {
  const records = await getNvStarsGalleryRecords();
  return records
    .filter(isNvStarsTeamGridPhoto)
    .sort(nvStarsTeamGridOrder)
    .map(({ src, alt, caption, teamLabel, season }) => ({
      src,
      alt,
      caption,
      teamLabel,
      season,
    }));
}

export async function getPublicNvStarsHighlights(): Promise<NvStarsPublicPhoto[]> {
  const records = await getNvStarsGalleryRecords();
  return records
    .filter((item) => item.category === "nv-stars-news" && !NV_STARS_TEAM_GRID_SLUG_SET.has(item.slug))
    .map(({ src, alt, caption }) => ({ src, alt, caption }));
}

export async function getFeaturedNvStarsHomePhotos(): Promise<NvStarsPublicPhoto[]> {
  const records = await getNvStarsGalleryRecords();
  const featured = records.filter((item) => item.category === "nv-stars-team" && item.featuredOnHomepage);
  const pool = featured.length ? featured : records.filter((item) => item.category === "nv-stars-team");
  return pool.slice(0, 3).map(({ src, alt, caption, teamLabel, season }) => ({
    src,
    alt,
    caption,
    teamLabel,
    season,
  }));
}

export async function getPublicGallery() {
  const state = await getPublicContentState("gallery_photo");
  const cms = state.published
    .filter((item) => !isNvStarsGalleryCategory(dataString(item.data, "category")))
    .map((item) => ({
      src: dataString(item.data, "photoUrl"),
      alt: dataString(item.data, "caption") || item.title,
      caption: dataString(item.data, "caption") || item.title,
      category: dataString(item.data, "category"),
      sort: Number(dataString(item.data, "sortOrderDisplay")) || item.sort_order,
    }))
    .filter((photo) => photo.src);
  if (state.cmsManaged) return cms.map(({ src, alt, caption }) => ({ src, alt, caption }));
  if (cms.length) return cms.map(({ src, alt, caption }) => ({ src, alt, caption }));
  return [...GALLERY];
}

const SERVICES_GALLERY_EXCLUDED_CAPTIONS = new Set([
  "facility opening",
  "around the academy",
  "player instruction",
  "hittrax",
]);

function isExcludedFromServicesGallery(photo: { caption: string; alt: string }) {
  const caption = photo.caption.trim().toLowerCase();
  const alt = photo.alt.trim().toLowerCase();
  if (SERVICES_GALLERY_EXCLUDED_CAPTIONS.has(caption)) return true;
  if (caption.includes("hittrax") || alt.includes("hittrax")) return true;
  return false;
}

/** Gallery photos for the services page sidebar (all gallery items minus a fixed exclude list). */
export async function getPublicFacilityGalleryPhotos(introImage?: { src: string; alt: string }) {
  const all = await getPublicGallery();
  let photos = all.filter((photo) => !isExcludedFromServicesGallery(photo));

  if (introImage?.src && !photos.some((photo) => photo.src === introImage.src)) {
    const introEntry = { src: introImage.src, alt: introImage.alt, caption: introImage.alt };
    if (!isExcludedFromServicesGallery(introEntry)) {
      photos = [introEntry, ...photos];
    }
  }

  const seen = new Set<string>();
  return photos.filter((photo) => {
    if (seen.has(photo.src)) return false;
    seen.add(photo.src);
    return true;
  });
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
        src: resolveCmsMediaUrl(introItem.data, "facilityImageUrl", SERVICES_FACILITY_IMAGE.src),
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

export type FounderPublicContent = {
  homeSummary: string;
  /** Primary founder graphic (career stats poster) on homepage and about bio. */
  mainImageUrl: string;
  photoUrl: string;
  careerPosterUrl: string;
  testimonialsFlyerUrl: string;
  stats: { label: string; value: string }[];
  bioSections: { heading: string; paragraphs: string[] }[];
  testimonials: { name: string; title: string; quote: string }[];
};

export async function getPublicFounderContent(): Promise<FounderPublicContent> {
  const [about, instructorState] = await Promise.all([
    getPublishedSingleton("about_settings"),
    getPublicContentState("instructor"),
  ]);
  const data = about?.data ?? {};
  const noochieCms = instructorState.published.find(
    (item) => dataString(item.data, "coachId") === "noochie" || item.slug === "noochie",
  );
  const noochieData = noochieCms?.data ?? {};

  const testimonialBradQuote = dataString(data, "testimonialBradQuote");
  const testimonialMacQuote = dataString(data, "testimonialMacQuote");

  const careerPosterUrl =
    data && "founderCareerPosterUrl" in data
      ? dataString(data, "founderCareerPosterUrl") || FOUNDER_CAREER_POSTER
      : FOUNDER_CAREER_POSTER;

  return {
    homeSummary: dataString(data, "founderHomeSummary") || FOUNDER_HOME_SUMMARY,
    mainImageUrl: careerPosterUrl,
    photoUrl:
      (data && "founderPhotoUrl" in data ? dataString(data, "founderPhotoUrl") : "") ||
      dataString(noochieData, "photoUrl") ||
      FOUNDER_PHOTO,
    careerPosterUrl,
    testimonialsFlyerUrl:
      data && "founderTestimonialsFlyerUrl" in data
        ? dataString(data, "founderTestimonialsFlyerUrl") || FOUNDER_TESTIMONIALS_FLYER
        : FOUNDER_TESTIMONIALS_FLYER,
    stats: FOUNDER_CAREER_STATS.map((stat) => ({ label: stat.label, value: stat.value })),
    bioSections: FOUNDER_BIO_SECTIONS.map((section) => ({
      heading: section.heading,
      paragraphs: [...section.paragraphs],
    })),
    testimonials: [
      {
        name: dataString(data, "testimonialBradName") || FOUNDER_TESTIMONIALS[0].name,
        title: dataString(data, "testimonialBradTitle") || FOUNDER_TESTIMONIALS[0].title,
        quote: testimonialBradQuote || FOUNDER_TESTIMONIALS[0].quote,
      },
      {
        name: dataString(data, "testimonialMacName") || FOUNDER_TESTIMONIALS[1].name,
        title: dataString(data, "testimonialMacTitle") || FOUNDER_TESTIMONIALS[1].title,
        quote: testimonialMacQuote || FOUNDER_TESTIMONIALS[1].quote,
      },
    ],
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
    mainImageUrl: resolveCmsMediaUrl(data, "mainImageUrl", "/images/facility/facility.jpg"),
    secondaryImageUrl: resolveCmsMediaUrl(data, "secondaryImageUrl", "/images/facility/about-2.jpg"),
    facilityVideoUrl: resolveCmsUrlWithDefault(data, "facilityVideoUrl", SITE.facilityVideo),
    facilityDescription: dataString(data, "facilityDescription") || SITE.facility,
    features: featuresState.published.map((item) => ({
      label: dataString(item.data, "label") || item.title,
      description: dataString(item.data, "description"),
    })),
    contact,
  };
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

const DEFAULT_HOME_LESSON_SLUGS = ["hitting", "pitching", "fielding"] as const;

export async function getFeaturedHomeLessons() {
  const lessons = await getPublicLessons();
  const bySlug = new Map<string, (typeof lessons)[number]>(lessons.map((lesson) => [lesson.slug, lesson]));
  const state = await getPublicContentState("lesson");
  const featuredSlugs = state.published
    .filter((item) => dataString(item.data, "featuredOnHomepage") === "yes")
    .map((item) => item.slug);

  const orderedSlugs: string[] =
    featuredSlugs.length > 0
      ? [...featuredSlugs, ...DEFAULT_HOME_LESSON_SLUGS.filter((slug) => !featuredSlugs.includes(slug))].slice(0, 3)
      : [...DEFAULT_HOME_LESSON_SLUGS];

  return orderedSlugs
    .map((slug) => bySlug.get(slug))
    .filter((lesson): lesson is (typeof lessons)[number] => Boolean(lesson));
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

/** College alumni feature (from News CMS article) for /nv-stars and homepage. */
export async function getNvStarsCollegeFeature(): Promise<{
  title: string;
  summary: string;
  image: { src: string; alt: string };
}> {
  const articles = await getPublicNewsArticles();
  const article = articles[0];
  if (article) {
    return {
      title: "NV Stars Players playing in College",
      summary: article.summary || article.body,
      image: { src: article.image, alt: article.headline },
    };
  }
  return {
    title: "NV Stars Players playing in College",
    summary: "Former NV Stars players who went on to play college baseball.",
    image: {
      src: "/images/brand/college-alumni.png",
      alt: "Former NV Stars players playing college baseball",
    },
  };
}

export async function getNvStarsMainImage(): Promise<{ src: string; alt: string }> {
  const college = await getNvStarsCollegeFeature();
  return college.image;
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

function hittraxLeagueFromItem(item: ContentItem): HitTraxLeague {
  const data = item.data;
  return {
    id: item.slug,
    eyebrow: dataString(data, "eyebrow") || "Registration",
    title: item.title,
    ages: dataString(data, "ages"),
    startDate: dataString(data, "startDate"),
    schedule: dataString(data, "schedule"),
    price: dataString(data, "price"),
    secondaryPrice: dataString(data, "secondaryPrice"),
    registrationDeadline: dataString(data, "registrationDeadline"),
    registerUrl: dataString(data, "registerUrl"),
    registerCtaLabel: dataString(data, "registerCtaLabel") || "Register now",
    secondaryRegisterUrl: dataString(data, "secondaryRegisterUrl"),
    secondaryRegisterCtaLabel: dataString(data, "secondaryRegisterCtaLabel") || "Full payment",
    flyerSrc: resolveCmsMediaUrl(data, "flyerUrl", ""),
    flyerAlt: dataString(data, "flyerAlt") || `${item.title} — Noochie Varner Baseball Academy`,
  };
}

function sortHittraxLeagues(a: HitTraxLeague, b: HitTraxLeague, orderBySlug: Map<string, number>) {
  const orderA = orderBySlug.get(a.id) ?? 999;
  const orderB = orderBySlug.get(b.id) ?? 999;
  return orderA - orderB || a.title.localeCompare(b.title);
}

export async function getPublicHitTraxLeagues(): Promise<HitTraxLeague[]> {
  const state = await getPublicContentState("hittrax_league");
  const orderBySlug = new Map(
    state.published.map((item) => [
      item.slug,
      Number(dataString(item.data, "sortOrderDisplay")) || item.sort_order,
    ]),
  );
  const cmsItems = state.published.map(hittraxLeagueFromItem).sort((a, b) => sortHittraxLeagues(a, b, orderBySlug));

  if (state.cmsManaged || isNvbaCmsConfigured()) return cmsItems;

  const managed = new Set(state.managedSlugs);
  const fallback = FALLBACK_HITTRAX_LEAGUES.filter((league) => !managed.has(league.id));
  return [...cmsItems, ...fallback].sort((a, b) => sortHittraxLeagues(a, b, orderBySlug));
}

export async function getFeaturedHomeHitTraxLeagues(): Promise<HitTraxLeague[]> {
  const leagues = await getPublicHitTraxLeagues();
  const state = await getPublicContentState("hittrax_league");
  const featuredSlugs = new Set(
    state.published
      .filter((item) => dataString(item.data, "featuredOnHomepage") !== "no")
      .map((item) => item.slug),
  );

  if (state.published.length && featuredSlugs.size) {
    return leagues.filter((league) => featuredSlugs.has(league.id));
  }

  return leagues;
}

export type HitTraxLeaguesSectionCopy = {
  eyebrow: string;
  title: string;
  description: string;
};

export async function getHitTraxLeaguesSectionCopy(
  homepageData: Record<string, unknown> | null | undefined,
): Promise<HitTraxLeaguesSectionCopy> {
  return {
    eyebrow: homepageData ? dataString(homepageData, "hittraxSectionEyebrow") : "",
    title: homepageData ? dataString(homepageData, "hittraxSectionTitle") : "",
    description: homepageData ? dataString(homepageData, "hittraxSectionDescription") : "",
  };
}

export function resolveHitTraxLeaguesSectionCopy(copy: HitTraxLeaguesSectionCopy): Required<HitTraxLeaguesSectionCopy> {
  return {
    eyebrow: copy.eyebrow || "Now registering",
    title: copy.title || "Now Registering",
    description: copy.description || DEFAULT_REGISTRATIONS_SECTION_DESCRIPTION,
  };
}
