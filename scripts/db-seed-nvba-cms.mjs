import { createClient } from "@supabase/supabase-js";
import { loadEnvLocal } from "./load-env.mjs";
import {
  ABOUT,
  CAMPS,
  CONTACT_TOPICS,
  FACILITY_FEATURES,
  GALLERY,
  INSTRUCTORS,
  LESSONS,
  MEMBERSHIP,
  SERVICES,
  SERVICES_FACILITY_IMAGE,
  SERVICES_INTRO,
  SITE,
  SPONSORS,
  SPONSORS_INTRO,
  HITTRAX_LEAGUES,
  NV_STARS_GALLERY,
  slugify,
} from "./nvba-cms-seed-data.mjs";

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

const { data: tenant, error: tenantError } = await db
  .from("tenants")
  .select("id, slug, display_name")
  .eq("id", tenantId)
  .maybeSingle();

if (tenantError) throw new Error(`Could not validate TENANT_ID: ${tenantError.message}`);

const normalizedName = tenant?.display_name?.trim().toLowerCase() ?? "";
const normalizedSlug = tenant?.slug?.trim().toLowerCase() ?? "";
const isNvbaTenant =
  normalizedName.includes("noochie varner") ||
  ["noochie varner baseball academy", "noochie varner baseball academy (nvba)", "nvba"].includes(normalizedName) ||
  [
    "noochie-varner-baseball-academy",
    "noochie-varner-baseball-softball-academy-2",
    "noochie-varner",
    "nvba",
    "noochievarner",
  ].includes(normalizedSlug);

if (!tenant || tenant.id !== tenantId || !isNvbaTenant) {
  throw new Error(
    `Refusing to seed: TENANT_ID ${tenantId} is not the NVBA tenant (found ${tenant?.slug ?? "no tenant"} / ${tenant?.display_name ?? "no tenant"}).`,
  );
}

const item = (content_type, slug, title, data, sort_order = 0, published = true) => ({
  tenant_id: tenantId,
  content_type,
  slug,
  title,
  data: { cmsManaged: true, ...data },
  sort_order,
  published,
});

const rows = [
  item(
    "homepage",
    "homepage",
    "Homepage Content",
    {
      locationLabel: "Georgetown, Kentucky",
      headlinePrimary: "NOOCHIE VARNER",
      headlineSecondary: "BASEBALL ACADEMY",
      heroDescription: SITE.tagline,
      heroImageUrl: "/images/facility/hero-infield.jpg",
      facilityBadgeLabel: "Indoor facility",
      facilityBadgeText: "16,000 sq. ft.",
      primaryButtonText: "Book a Lesson",
      primaryButtonHref: "https://12331.ezfacility.com/Sessions",
      secondaryButtonText: "Camps & Clinics",
      secondaryButtonHref: "/camps",
      campsSectionEyebrow: "Now registering",
      campsSectionTitle: "Camps & Clinics",
      campsSectionDescription:
        "Develop your skills with camps, clinics, and programs designed for every level.",
      hittraxSectionEyebrow: "Now registering",
      hittraxSectionTitle: "Upcoming HitTrax Leagues",
      hittraxSectionDescription:
        "Each league runs four weeks, followed by a single-elimination tournament.",
      lessonsSectionEyebrow: "Private instruction",
      lessonsSectionTitle: "Train with experienced coaches",
      lessonsSectionDescription:
        "Personalized baseball and softball instruction focused on skills, confidence, and development.",
      facilitySectionImageUrl: "/images/facility/about-3.jpg",
      facilitySectionTitle: "16,000 sq. ft. built for development.",
      facilitySectionDescription:
        "Train year-round in our indoor baseball and softball facility in Georgetown, Kentucky.",
      facilitySectionButtonText: "About the Academy",
      membershipSectionEyebrow: "Membership",
      membershipSectionTitle: MEMBERSHIP.name,
      membershipSectionDescription:
        "Train year-round with HitTrax lessons, daily cage access, gym access, and priority scheduling. Choose a one-time payment or monthly installments — see membership details for full pricing.",
    },
    0,
  ),
  ...HITTRAX_LEAGUES.map((league, index) =>
    item(
      "hittrax_league",
      league.slug,
      league.title,
      {
        eyebrow: league.eyebrow,
        ages: league.ages,
        startDate: league.startDate.replace(/^League begins /i, ""),
        schedule: league.schedule,
        price: league.price,
        registrationDeadline: league.registrationDeadline.replace(/^Registration deadline: /i, ""),
        registerUrl: league.registerUrl,
        flyerUrl: league.flyerUrl,
        flyerAlt: league.flyerAlt,
        featuredOnHomepage: "yes",
        sortOrderDisplay: String(index + 1),
      },
      index + 1,
    ),
  ),
  ...CAMPS.map((camp, index) =>
    item(
      "program",
      camp.slug,
      camp.name,
      {
        eyebrow: camp.eyebrow,
        summary: camp.summary,
        details: camp.details,
        sectionsJson: JSON.stringify(camp.sections ?? []),
        ages: camp.ages,
        dates: camp.dates,
        days: camp.days,
        times: camp.times,
        price: camp.price,
        capacity: camp.limit,
        instructor: camp.instructor,
        bookingKey: camp.bookingKey,
        cta: camp.cta,
        registrationEnabled: "yes",
        featuredOnHomepage: "yes",
        flyerUrl: camp.image,
        sortOrderDisplay: String(index + 1),
      },
      index + 1,
    ),
  ),
  ...INSTRUCTORS.map((instructor) =>
    item(
      "instructor",
      instructor.slug,
      instructor.name,
      {
        coachId: instructor.coachId,
        title: instructor.title,
        shortBio: instructor.shortBio,
        fullBio: instructor.fullBio,
        photoUrl: instructor.photoUrl,
        phone: instructor.phone,
        email: instructor.email,
        featuredOnHomepage: instructor.featuredOnHomepage,
        sortOrderDisplay: String(instructor.sort),
      },
      instructor.sort,
    ),
  ),
  ...LESSONS.map((lesson) =>
    item(
      "lesson",
      lesson.slug,
      lesson.name,
      {
        instructorName: lesson.instructorName,
        category: lesson.category,
        description: lesson.description,
        focusAreas: lesson.focusAreas,
        bookingKey: lesson.bookingKey,
        imageUrl: lesson.imageUrl ?? "",
        featuredOnHomepage: lesson.featuredOnHomepage,
        sortOrderDisplay: String(lesson.sort),
      },
      lesson.sort,
    ),
  ),
  item(
    "membership_display",
    "big-league-membership",
    MEMBERSHIP.name,
    {
      term: MEMBERSHIP.term,
      shortDescription:
        "Train year-round with indoor access, HitTrax lessons, cage time, and priority scheduling.",
      fullDescription: "",
      benefits: MEMBERSHIP.includes,
      displayAnnualPrice: MEMBERSHIP.annual,
      displayMonthlyPrice: MEMBERSHIP.monthly,
      displayInitiationFee: MEMBERSHIP.initiation,
      featuredOnHomepage: "yes",
    },
    0,
  ),
  item(
    "services_intro",
    "services-intro",
    "Services Page Intro",
    {
      servicesIntro: SERVICES_INTRO,
      facilityImageUrl: SERVICES_FACILITY_IMAGE.src,
      facilityImageAlt: SERVICES_FACILITY_IMAGE.alt,
    },
    0,
  ),
  ...SERVICES.map((service, index) => {
    const rates = service.rates?.map((rate) => `${rate.label} | ${rate.price}`) ?? [];
    return item(
      "nvba_service",
      slugify(service.name),
      service.name,
      {
        shortDescription: service.lead ?? "",
        fullDescription: service.detail ?? "",
        bullets: service.bullets ?? [],
        rates,
        displayPrice: service.price ?? "",
        contactOnly: service.contact ? "yes" : "no",
        sortOrderDisplay: String(index + 1),
      },
      index + 1,
    );
  }),
  item(
    "about_settings",
    "about",
    "About & Facility",
    {
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
      facilityDescription: SITE.facility,
      squareFootage: "16,000 sq. ft.",
      infieldArea: SITE.infield,
      addressStreet: SITE.address.street,
      addressCity: SITE.address.city,
      addressState: SITE.address.state,
      addressZip: SITE.address.zip,
      mainImageUrl: ABOUT.mainImageUrl,
      secondaryImageUrl: ABOUT.secondaryImageUrl,
      facilityVideoUrl: SITE.facilityVideo,
    },
    0,
  ),
  ...FACILITY_FEATURES.map((feature) =>
    item(
      "facility_feature",
      feature.slug,
      feature.label,
      {
        label: feature.label,
        description: feature.description,
        sortOrderDisplay: String(feature.sort),
      },
      feature.sort,
    ),
  ),
  item(
    "contact_settings",
    "contact-settings",
    "Contact Settings",
    {
      introText:
        "Questions about lessons, camps, memberships, facility rentals, or equipment? Send a message and we will follow up.",
      phone: SITE.phone,
      textNumber: SITE.phone,
      email: SITE.email,
      street: SITE.address.street,
      city: SITE.address.city,
      state: SITE.address.state,
      zip: SITE.address.zip,
      mapsUrl: SITE.address.mapUrl,
      facebook: SITE.social.facebook,
      instagram: SITE.social.instagram,
      youtube: SITE.social.youtube,
      x: SITE.social.x,
    },
    0,
  ),
  ...CONTACT_TOPICS.map((topic, index) =>
    item(
      "contact_topic",
      topic.value,
      topic.label,
      { value: topic.value, sortOrderDisplay: String(index + 1) },
      index + 1,
    ),
  ),
  ...GALLERY.map((photo, index) =>
    item(
      "gallery_photo",
      photo.slug,
      photo.caption,
      {
        caption: photo.caption,
        category: photo.category,
        photoUrl: photo.src,
        featured: "no",
        sortOrderDisplay: String(index + 1),
      },
      index + 1,
    ),
  ),
  ...NV_STARS_GALLERY.map((photo, index) =>
    item(
      "gallery_photo",
      photo.slug,
      photo.caption || photo.slug,
      {
        caption: photo.caption,
        category: photo.category,
        photoUrl: photo.src,
        teamLabel: "",
        season: "",
        featured: photo.featuredOnHomepage ? "yes" : "no",
        sortOrderDisplay: String(photo.sort),
      },
      photo.sort,
    ),
  ),
  item(
    "news_article",
    "college-alumni",
    "Former NV Stars players playing college baseball",
    {
      summary: "Former NV Stars players who went on to play college baseball.",
      body: "Former NV Stars players who went on to play college baseball.",
      featuredImageUrl: "/images/brand/college-alumni.png",
      publicationDate: "",
      sortOrderDisplay: "1",
    },
    1,
  ),
  ...SPONSORS.map((sponsor, index) =>
    item(
      "sponsor",
      sponsor.slug,
      sponsor.name,
      {
        shortDescription: sponsor.note,
        websiteUrl: sponsor.href,
        logoUrl: sponsor.image,
        cta: sponsor.cta,
        featuredOnHomepage: sponsor.featuredOnHomepage,
        sortOrderDisplay: String(index + 1),
      },
      index + 1,
    ),
  ),
  item(
    "site_settings",
    "site-settings",
    "Site Settings",
    {
      academyName: SITE.name,
      shortName: SITE.shortName,
      tagline: SITE.tagline,
      phone: SITE.phone,
      email: SITE.email,
      addressFull: SITE.address.full,
      footerDescription: SITE.tagline,
      defaultSeoTitle: `${SITE.name} | Baseball & Softball Training in Georgetown, KY`,
      defaultSeoDescription: SITE.tagline,
      facebook: SITE.social.facebook,
      instagram: SITE.social.instagram,
      youtube: SITE.social.youtube,
      x: SITE.social.x,
      sponsorsIntro: SPONSORS_INTRO,
      logoUrl: "/images/brand/icon.png",
    },
    0,
  ),
];

const { data: existing, error: existingError } = await db
  .from("tenant_content_items")
  .select("content_type, slug")
  .eq("tenant_id", tenantId);

if (existingError) throw new Error(`Could not inspect existing CMS rows: ${existingError.message}`);

const existingKeys = new Set((existing ?? []).map((row) => `${row.content_type}:${row.slug}`));
const toInsert = rows.filter((row) => !existingKeys.has(`${row.content_type}:${row.slug}`));

if (!toInsert.length) {
  console.log(`NVBA CMS seed: nothing to insert (${rows.length} records already present for tenant ${tenantId}).`);
  process.exit(0);
}

const { error } = await db.from("tenant_content_items").insert(toInsert);
if (error) throw error;

console.log(`NVBA CMS seed: inserted ${toInsert.length} new records (${existingKeys.size} already existed).`);
