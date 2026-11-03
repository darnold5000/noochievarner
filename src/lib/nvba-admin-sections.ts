import type { ContentType } from "@/lib/nvba-cms";

export type AdminOption = { label: string; value: string };

export type AdminField = {
  key: string;
  label: string;
  kind?: "text" | "textarea" | "url" | "email" | "tel" | "date" | "file" | "select" | "checkboxes" | "string-list" | "number";
  placeholder?: string;
  help?: string;
  accept?: string;
  targetKey?: string;
  advanced?: boolean;
  options?: readonly AdminOption[];
};

export type AdminSection = {
  type: ContentType;
  title: string;
  singular: string;
  description: string;
  emptyText: string;
  titleLabel: string;
  deriveTitleFrom?: string;
  singleton?: boolean;
  allowDuplicate?: boolean;
  fields: readonly AdminField[];
};

const bookingKeyOptions = [
  { label: "Advanced Pitching Clinic", value: "pitchingClinic" },
  { label: "Bat Speed Clinic", value: "batSpeed" },
  { label: "Rookie Development", value: "rookie" },
  { label: "Winter Tee Ball", value: "teeBall" },
  { label: "Noochie Hitting", value: "noochieHitting" },
  { label: "Jordan Fox Pitching", value: "jordanFox" },
  { label: "Corey Alsop Fielding", value: "coreyAlsop" },
  { label: "Catching", value: "catching" },
] as const;

const lessonCategoryOptions = [
  { label: "Hitting", value: "hitting" },
  { label: "Pitching", value: "pitching" },
  { label: "Fielding", value: "fielding" },
  { label: "Catching", value: "catching" },
] as const;

const galleryCategoryOptions = [
  { label: "Facility", value: "facility" },
  { label: "Training", value: "training" },
  { label: "Camps & Clinics", value: "camps" },
  { label: "Events", value: "events" },
  { label: "NV Stars — Team photo", value: "nv-stars-team" },
  { label: "NV Stars — News & highlight", value: "nv-stars-news" },
] as const;

export const websiteContentNav = [
  ["homepage", "Homepage"],
  ["camps", "Camps & Clinics"],
  ["lessons-instructors", "Lessons — Instructors"],
  ["lessons", "Lessons — Offerings"],
  ["memberships", "Memberships"],
  ["services", "NVBA Services"],
  ["about-facility", "About & Facility"],
  ["contact", "Contact"],
  ["gallery", "Gallery"],
  ["news", "News"],
  ["sponsors", "Sponsors"],
  ["settings", "Site Settings"],
] as const;

export const adminSections: Record<string, AdminSection> = {
  homepage: {
    type: "homepage",
    title: "Homepage",
    singular: "Homepage",
    titleLabel: "Internal name",
    singleton: true,
    description: "Hero text, facility block, section headings, and homepage featured flags.",
    emptyText: "Homepage content has not been set up yet.",
    fields: [
      { key: "locationLabel", label: "Hero location label", placeholder: "Georgetown, Kentucky" },
      { key: "headlinePrimary", label: "Hero headline (line 1)", placeholder: "NOOCHIE VARNER" },
      { key: "headlineSecondary", label: "Hero headline (line 2)", placeholder: "BASEBALL ACADEMY" },
      { key: "heroDescription", label: "Hero supporting description", kind: "textarea" },
      { key: "heroImageFile", targetKey: "heroImageUrl", label: "Hero photo", kind: "file", accept: "image/jpeg,image/png,image/webp" },
      { key: "facilityBadgeLabel", label: "Facility badge label", placeholder: "Indoor facility" },
      { key: "facilityBadgeText", label: "Facility badge text", placeholder: "16,000 sq. ft." },
      { key: "primaryButtonText", label: "Primary button text", placeholder: "Book a Lesson" },
      { key: "primaryButtonHref", label: "Primary button link", placeholder: "/book or EZFacility URL" },
      { key: "secondaryButtonText", label: "Secondary button text", placeholder: "Camps & Clinics" },
      { key: "secondaryButtonHref", label: "Secondary button link", placeholder: "/camps" },
      { key: "campsSectionEyebrow", label: "Camps section eyebrow", placeholder: "Now registering" },
      { key: "campsSectionTitle", label: "Camps section title" },
      { key: "campsSectionDescription", label: "Camps section description", kind: "textarea" },
      { key: "lessonsSectionEyebrow", label: "Lessons section eyebrow" },
      { key: "lessonsSectionTitle", label: "Lessons section title" },
      { key: "lessonsSectionDescription", label: "Lessons section description", kind: "textarea" },
      { key: "facilitySectionImageFile", targetKey: "facilitySectionImageUrl", label: "Featured facility image", kind: "file", accept: "image/jpeg,image/png,image/webp" },
      { key: "facilitySectionTitle", label: "Facility section headline" },
      { key: "facilitySectionDescription", label: "Facility section description", kind: "textarea" },
      { key: "facilitySectionButtonText", label: "Facility button text", placeholder: "About the Academy" },
      { key: "membershipSectionEyebrow", label: "Membership section eyebrow" },
      { key: "membershipSectionTitle", label: "Membership section title" },
      { key: "membershipSectionDescription", label: "Membership section description", kind: "textarea" },
      { key: "heroImageUrl", label: "External hero image URL", kind: "url", advanced: true },
      { key: "facilitySectionImageUrl", label: "External facility image URL", kind: "url", advanced: true },
    ],
  },
  camps: {
    type: "program",
    title: "Camps & Clinics",
    singular: "Program",
    titleLabel: "Program name",
    allowDuplicate: true,
    description: "Add, edit, duplicate, hide, or archive camps and clinics. Registration links stay connected to EZFacility.",
    emptyText: "No programs yet. Add your first camp or clinic.",
    fields: [
      { key: "eyebrow", label: "Category / eyebrow", placeholder: "Pitching clinic" },
      { key: "summary", label: "Short description", kind: "textarea" },
      { key: "details", label: "Full description paragraphs", kind: "string-list", help: "One paragraph per line." },
      { key: "ages", label: "Age requirements", placeholder: "12–16" },
      { key: "startDate", label: "Start date", kind: "date" },
      { key: "endDate", label: "End date", kind: "date" },
      { key: "dates", label: "Display dates (public)", placeholder: "February 1 – February 15" },
      { key: "days", label: "Days", placeholder: "Sundays" },
      { key: "times", label: "Times", placeholder: "7:00–8:30 p.m." },
      { key: "price", label: "Price", placeholder: "$119 + tax" },
      { key: "capacity", label: "Capacity / limit", placeholder: "First 16 players" },
      { key: "registrationDeadline", label: "Registration deadline (optional)" },
      { key: "instructor", label: "Instructor" },
      { key: "trainingTopics", label: "Training topics / bullet list", kind: "string-list" },
      { key: "includedBenefits", label: "Included benefits", kind: "string-list" },
      { key: "flyerFile", targetKey: "flyerUrl", label: "Promotional flyer", kind: "file", accept: "image/jpeg,image/png,image/webp" },
      {
        key: "bookingKey",
        label: "Registration destination",
        kind: "select",
        options: bookingKeyOptions,
        help: "Connects the Register button to the existing EZFacility registration URL.",
      },
      { key: "cta", label: "Button label", placeholder: "Register" },
      { key: "registrationEnabled", label: "Registration enabled", kind: "select", options: [
        { label: "Enabled", value: "yes" },
        { label: "Disabled (display only)", value: "no" },
      ] },
      { key: "featuredOnHomepage", label: "Featured on homepage", kind: "select", options: [
        { label: "Yes", value: "yes" },
        { label: "No", value: "no" },
      ] },
      { key: "sortOrderDisplay", label: "Display order", kind: "number", help: "Lower numbers appear first." },
      { key: "flyerUrl", label: "External flyer URL", kind: "url", advanced: true },
      { key: "sectionsJson", label: "Structured sections (JSON)", kind: "textarea", advanced: true, help: "Optional JSON array for program detail sections." },
      { key: "archiveOnly", label: "Archive only (block delete)", kind: "select", advanced: true, options: [
        { label: "No", value: "no" },
        { label: "Yes — has registrations", value: "yes" },
      ] },
    ],
  },
  "lessons-instructors": {
    type: "instructor",
    title: "Instructors",
    singular: "Instructor",
    titleLabel: "Name",
    description: "Coach photos, bios, and homepage featuring. Deactivate instead of deleting when bookings exist.",
    emptyText: "No instructors yet.",
    fields: [
      { key: "coachId", label: "Booking coach ID", kind: "select", options: [
        { label: "Noochie (hitting)", value: "noochie" },
        { label: "Jordan (pitching)", value: "jordan" },
        { label: "Corey (fielding)", value: "corey" },
        { label: "NVBA (catching)", value: "nvba" },
      ], help: "Links CMS copy to the existing schedule/booking coach record." },
      { key: "photoFile", targetKey: "photoUrl", label: "Photo", kind: "file", accept: "image/jpeg,image/png,image/webp" },
      { key: "title", label: "Title / specialty", placeholder: "Hitting instructor" },
      { key: "shortBio", label: "Short biography", kind: "textarea" },
      { key: "fullBio", label: "Full biography", kind: "textarea" },
      { key: "email", label: "Email", kind: "email" },
      { key: "phone", label: "Phone", kind: "tel" },
      { key: "featuredOnHomepage", label: "Featured on homepage", kind: "select", options: [
        { label: "Yes", value: "yes" },
        { label: "No", value: "no" },
      ] },
      { key: "sortOrderDisplay", label: "Display order", kind: "number" },
      { key: "photoUrl", label: "External photo URL", kind: "url", advanced: true },
    ],
  },
  lessons: {
    type: "lesson",
    title: "Lessons",
    singular: "Lesson",
    titleLabel: "Lesson name",
    description: "Public lesson cards. Pricing and duration should match the booking configuration.",
    emptyText: "No lessons yet.",
    fields: [
      { key: "instructorName", label: "Assigned instructor", placeholder: "Noochie Varner" },
      { key: "category", label: "Category", kind: "select", options: lessonCategoryOptions },
      { key: "description", label: "Description", kind: "textarea" },
      { key: "sessionDuration", label: "Session duration (display)", placeholder: "30 or 60 minutes" },
      { key: "displayPrice", label: "Display price note", placeholder: "From $45 — see lesson rates" },
      {
        key: "bookingKey",
        label: "Booking key",
        kind: "select",
        options: bookingKeyOptions,
        help: "Must match an existing booking destination.",
      },
      { key: "focusAreas", label: "Focus areas", kind: "string-list" },
      { key: "imageFile", targetKey: "imageUrl", label: "Photo", kind: "file", accept: "image/jpeg,image/png,image/webp" },
      { key: "sortOrderDisplay", label: "Display order", kind: "number" },
      { key: "imageUrl", label: "External image URL", kind: "url", advanced: true },
    ],
  },
  memberships: {
    type: "membership_display",
    title: "Memberships",
    singular: "Membership",
    titleLabel: "Membership name",
    singleton: true,
    description: "Public membership copy only. Stripe billing and subscriber pricing remain developer-managed.",
    emptyText: "Membership content has not been set up yet.",
    fields: [
      { key: "term", label: "Term label", placeholder: "12-month membership" },
      { key: "shortDescription", label: "Short description", kind: "textarea" },
      { key: "fullDescription", label: "Full description", kind: "textarea" },
      { key: "benefits", label: "Benefits", kind: "string-list" },
      { key: "displayAnnualPrice", label: "Display annual price (informational)", placeholder: "$500 one-time payment" },
      { key: "displayMonthlyPrice", label: "Display monthly price (informational)", placeholder: "$50.00 monthly installments" },
      { key: "displayInitiationFee", label: "Initiation fee note (informational)" },
      { key: "imageFile", targetKey: "imageUrl", label: "Membership image", kind: "file", accept: "image/jpeg,image/png,image/webp" },
      { key: "featuredOnHomepage", label: "Featured on homepage", kind: "select", options: [
        { label: "Yes", value: "yes" },
        { label: "No", value: "no" },
      ] },
      { key: "enrollmentNote", label: "Enrollment availability note", kind: "textarea" },
      { key: "imageUrl", label: "External image URL", kind: "url", advanced: true },
    ],
  },
  services: {
    type: "nvba_service",
    title: "NVBA Services",
    singular: "Service",
    titleLabel: "Service title",
    description: "Facility services shown on the NVBA Services page.",
    emptyText: "No services yet.",
    fields: [
      { key: "shortDescription", label: "Short description", kind: "textarea" },
      { key: "fullDescription", label: "Full description", kind: "textarea" },
      { key: "bullets", label: "Bullet points", kind: "string-list" },
      { key: "rates", label: "Rates (label | price per line)", kind: "string-list", help: "Example: 30 minutes | $20" },
      { key: "displayPrice", label: "Single price (optional)", placeholder: "$200" },
      { key: "ctaLabel", label: "CTA label", placeholder: "Contact us" },
      { key: "ctaHref", label: "CTA link", placeholder: "/contact" },
      { key: "imageFile", targetKey: "imageUrl", label: "Image", kind: "file", accept: "image/jpeg,image/png,image/webp" },
      { key: "contactOnly", label: "Contact for pricing", kind: "select", options: [
        { label: "No", value: "no" },
        { label: "Yes", value: "yes" },
      ] },
      { key: "sortOrderDisplay", label: "Display order", kind: "number" },
      { key: "imageUrl", label: "External image URL", kind: "url", advanced: true },
    ],
  },
  "services-intro": {
    type: "services_intro",
    title: "Services Page Intro",
    singular: "Services intro",
    titleLabel: "Internal name",
    singleton: true,
    description: "Headline area and facility image for the services page.",
    emptyText: "Services intro not configured.",
    fields: [
      { key: "servicesIntro", label: "Introductory text", kind: "textarea" },
      { key: "facilityImageFile", targetKey: "facilityImageUrl", label: "Facility image", kind: "file", accept: "image/jpeg,image/png,image/webp" },
      { key: "facilityImageAlt", label: "Facility image alt text" },
      { key: "facilityImageUrl", label: "External image URL", kind: "url", advanced: true },
    ],
  },
  "about-facility": {
    type: "about_settings",
    title: "About & Facility",
    singular: "About page",
    titleLabel: "Internal name",
    singleton: true,
    description: "Academy story, mission, owner bio, and main facility details.",
    emptyText: "About content has not been set up yet.",
    fields: [
      { key: "introEyebrow", label: "Page eyebrow", placeholder: "Georgetown, Kentucky" },
      { key: "introTitle", label: "Page title", placeholder: "About the Academy" },
      { key: "introText", label: "Introduction", kind: "textarea" },
      { key: "storyParagraphs", label: "About page paragraphs", kind: "string-list", help: "One paragraph per line." },
      { key: "story", label: "Academy story (legacy single field)", kind: "textarea", advanced: true },
      { key: "mission", label: "Mission", kind: "textarea" },
      { key: "ownerBio", label: "Owner biography", kind: "textarea" },
      { key: "facilityDescription", label: "Facility description", kind: "textarea" },
      { key: "squareFootage", label: "Square footage", placeholder: "16,000 sq. ft." },
      { key: "infieldArea", label: "Infield / training area note" },
      { key: "addressStreet", label: "Street address" },
      { key: "addressCity", label: "City" },
      { key: "addressState", label: "State" },
      { key: "addressZip", label: "ZIP" },
      { key: "mainImageFile", targetKey: "mainImageUrl", label: "Main facility image", kind: "file", accept: "image/jpeg,image/png,image/webp" },
      { key: "secondaryImageFile", targetKey: "secondaryImageUrl", label: "Secondary facility image", kind: "file", accept: "image/jpeg,image/png,image/webp" },
      { key: "facilityVideoUrl", label: "Facility video URL", kind: "url" },
      { key: "mainImageUrl", label: "External main image URL", kind: "url", advanced: true },
      { key: "secondaryImageUrl", label: "External secondary image URL", kind: "url", advanced: true },
    ],
  },
  "facility-features": {
    type: "facility_feature",
    title: "Facility Features",
    singular: "Feature",
    titleLabel: "Feature name",
    deriveTitleFrom: "label",
    description: "Repeatable facility highlights and equipment features.",
    emptyText: "No facility features yet.",
    fields: [
      { key: "label", label: "Feature label" },
      { key: "description", label: "Description", kind: "textarea" },
      { key: "sortOrderDisplay", label: "Display order", kind: "number" },
    ],
  },
  contact: {
    type: "contact_settings",
    title: "Contact",
    singular: "Contact page",
    titleLabel: "Internal name",
    singleton: true,
    description: "Shared contact details used on the contact page and site footer.",
    emptyText: "Contact settings have not been set up yet.",
    fields: [
      { key: "introText", label: "Introductory contact text", kind: "textarea" },
      { key: "phone", label: "Phone", kind: "tel" },
      { key: "textNumber", label: "Text / SMS number", kind: "tel" },
      { key: "email", label: "Email", kind: "email" },
      { key: "street", label: "Street address" },
      { key: "city", label: "City" },
      { key: "state", label: "State" },
      { key: "zip", label: "ZIP" },
      { key: "mapsUrl", label: "Google Maps link", kind: "url" },
      { key: "facebook", label: "Facebook URL", kind: "url" },
      { key: "instagram", label: "Instagram URL", kind: "url" },
      { key: "youtube", label: "YouTube URL", kind: "url" },
      { key: "x", label: "X URL", kind: "url" },
    ],
  },
  "contact-topics": {
    type: "contact_topic",
    title: "Contact Form Topics",
    singular: "Topic",
    titleLabel: "Topic label",
    description: "Inquiry categories on the contact form.",
    emptyText: "No contact topics yet.",
    fields: [
      { key: "value", label: "Form value (slug)", placeholder: "general" },
      { key: "sortOrderDisplay", label: "Display order", kind: "number" },
    ],
  },
  gallery: {
    type: "gallery_photo",
    title: "Gallery",
    singular: "Photo",
    titleLabel: "Caption",
    deriveTitleFrom: "caption",
    description: "Upload, caption, categorize, and reorder gallery photos. Use NV Stars categories for /nv-stars only; they do not appear on the public facility gallery.",
    emptyText: "No gallery photos yet.",
    fields: [
      { key: "caption", label: "Caption" },
      { key: "category", label: "Category", kind: "select", options: galleryCategoryOptions },
      { key: "teamLabel", label: "Team name or age division (optional)", placeholder: "Only for NV Stars team photos" },
      { key: "season", label: "Season (optional)", placeholder: "Fall 2026" },
      { key: "photoFile", targetKey: "photoUrl", label: "Photo", kind: "file", accept: "image/jpeg,image/png,image/webp" },
      { key: "featured", label: "Featured on homepage (NV Stars)", kind: "select", options: [
        { label: "No", value: "no" },
        { label: "Yes", value: "yes" },
      ], help: "Shows on homepage NV Stars feature when category is NV Stars — Team photo." },
      { key: "sortOrderDisplay", label: "Display order", kind: "number" },
      { key: "photoUrl", label: "External photo URL", kind: "url", advanced: true },
    ],
  },
  news: {
    type: "news_article",
    title: "News",
    singular: "Article",
    titleLabel: "Headline",
    description: "Publish news and media updates.",
    emptyText: "No news articles yet.",
    fields: [
      { key: "summary", label: "Short summary", kind: "textarea" },
      { key: "body", label: "Article body", kind: "textarea" },
      { key: "publicationDate", label: "Publication date", kind: "date" },
      { key: "featuredImageFile", targetKey: "featuredImageUrl", label: "Featured image", kind: "file", accept: "image/jpeg,image/png,image/webp" },
      { key: "sortOrderDisplay", label: "Display order", kind: "number" },
      { key: "featuredImageUrl", label: "External image URL", kind: "url", advanced: true },
    ],
  },
  sponsors: {
    type: "sponsor",
    title: "Sponsors",
    singular: "Sponsor",
    titleLabel: "Sponsor name",
    description: "Sponsor logos and links for the sponsors page and homepage.",
    emptyText: "No sponsors yet.",
    fields: [
      { key: "shortDescription", label: "Short description", kind: "textarea" },
      { key: "websiteUrl", label: "Website URL", kind: "url" },
      { key: "cta", label: "Link label", placeholder: "Visit our sponsor" },
      { key: "logoFile", targetKey: "logoUrl", label: "Logo", kind: "file", accept: "image/jpeg,image/png,image/webp" },
      { key: "featuredOnHomepage", label: "Featured on homepage", kind: "select", options: [
        { label: "Yes", value: "yes" },
        { label: "No", value: "no" },
      ] },
      { key: "sortOrderDisplay", label: "Display order", kind: "number" },
      { key: "logoUrl", label: "External logo URL", kind: "url", advanced: true },
    ],
  },
  settings: {
    type: "site_settings",
    title: "Site Settings",
    singular: "Site settings",
    titleLabel: "Internal name",
    singleton: true,
    description: "Academy name, default SEO, footer copy, and logo.",
    emptyText: "Site settings have not been set up yet.",
    fields: [
      { key: "academyName", label: "Academy name" },
      { key: "shortName", label: "Short name / abbreviation", placeholder: "NVBA" },
      { key: "tagline", label: "Tagline", kind: "textarea" },
      { key: "phone", label: "Primary phone", kind: "tel" },
      { key: "email", label: "Email", kind: "email" },
      { key: "addressFull", label: "Full address", kind: "textarea" },
      { key: "footerDescription", label: "Footer description", kind: "textarea" },
      { key: "defaultSeoTitle", label: "Default SEO title" },
      { key: "defaultSeoDescription", label: "Default meta description", kind: "textarea" },
      { key: "facebook", label: "Facebook", kind: "url" },
      { key: "instagram", label: "Instagram", kind: "url" },
      { key: "youtube", label: "YouTube", kind: "url" },
      { key: "x", label: "X", kind: "url" },
      { key: "logoFile", targetKey: "logoUrl", label: "Logo image", kind: "file", accept: "image/jpeg,image/png,image/webp" },
      { key: "logoUrl", label: "External logo URL", kind: "url", advanced: true },
    ],
  },
};

export function publicPathsForSection(section: string) {
  const map: Record<string, string[]> = {
    homepage: ["/"],
    camps: ["/camps", "/"],
    "lessons-instructors": ["/lessons", "/"],
    lessons: ["/lessons", "/"],
    memberships: ["/memberships", "/"],
    services: ["/services"],
    "services-intro": ["/services"],
    "about-facility": ["/about"],
    "facility-features": ["/about"],
    contact: ["/contact"],
    "contact-topics": ["/contact"],
    gallery: ["/gallery", "/services", "/nv-stars", "/"],
    news: ["/news"],
    sponsors: ["/sponsors", "/"],
    settings: ["/", "/contact"],
  };
  return map[section] ?? ["/"];
}

export function sectionViewPageHref(section: string) {
  const primary = publicPathsForSection(section)[0];
  return primary;
}
