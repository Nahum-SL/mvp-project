import IntranetDashboard from "../../../../features/public-web/intranet/components/IntranetDashboard";
import { getLinks } from "./action";

export default async function IntranetDashboardWrapper() {
  const { links } = await getLinks();
  return <IntranetDashboard initialLinks={links} />;
}
