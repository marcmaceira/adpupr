import { PageView, pageMetadata } from "@/lib/page-view";
import { HOME_SLUG } from "@/lib/paths";

export const generateMetadata = () => pageMetadata(HOME_SLUG);

export default function HomePage() {
  return <PageView slug={HOME_SLUG} />;
}
