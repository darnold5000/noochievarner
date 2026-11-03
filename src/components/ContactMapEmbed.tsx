import { SITE } from "@/content/site";

export default function ContactMapEmbed({
  className = "h-56 sm:h-64",
  embedUrl,
  locationLabel,
}: {
  className?: string;
  embedUrl?: string;
  locationLabel?: string;
}) {
  const src = embedUrl || SITE.address.mapEmbedUrl;
  const label = locationLabel || `${SITE.name} at ${SITE.address.full}`;
  return (
    <div className="overflow-hidden rounded-2xl border border-nv-navy/10">
      <iframe
        title={`Map showing ${label}`}
        src={src}
        className={`w-full ${className}`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
