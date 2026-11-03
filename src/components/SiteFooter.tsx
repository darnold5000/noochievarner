import Footer from "@/components/Footer";
import { getSiteBranding } from "@/lib/nvba-public-content";

export default async function SiteFooter() {
  const branding = await getSiteBranding();
  return <Footer branding={branding} />;
}
