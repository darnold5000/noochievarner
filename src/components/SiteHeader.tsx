import Header from "@/components/Header";
import { getSiteBranding } from "@/lib/nvba-public-content";

export default async function SiteHeader() {
  const branding = await getSiteBranding();
  return <Header branding={branding} />;
}
