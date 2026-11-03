import { SITE } from "@/content/site";

export default function ContactMapEmbed({ className = "h-56 sm:h-64" }: { className?: string }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-nv-navy/10">
      <iframe
        title={`Map showing ${SITE.name} at ${SITE.address.full}`}
        src={SITE.address.mapEmbedUrl}
        className={`w-full ${className}`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
