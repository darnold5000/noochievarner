import HomeHitTraxLeagueCards from "@/components/HomeHitTraxLeagueCards";
import HomeSectionHeader from "@/components/HomeSectionHeader";
import type { HitTraxLeague } from "@/content/hittrax-leagues";
import type { HitTraxLeaguesSectionCopy } from "@/lib/nvba-public-content";
import { resolveHitTraxLeaguesSectionCopy } from "@/lib/nvba-public-content";

export default function HomeHitTraxLeaguesSection({
  leagues,
  sectionCopy,
}: {
  leagues: HitTraxLeague[];
  sectionCopy: HitTraxLeaguesSectionCopy;
}) {
  if (!leagues.length) return null;

  const { eyebrow, title, description } = resolveHitTraxLeaguesSectionCopy(sectionCopy);

  return (
    <section className="border-t border-nv-navy/8 bg-white py-8 sm:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <HomeSectionHeader eyebrow={eyebrow} title={title} description={description} />
        <HomeHitTraxLeagueCards leagues={leagues} />
      </div>
    </section>
  );
}
