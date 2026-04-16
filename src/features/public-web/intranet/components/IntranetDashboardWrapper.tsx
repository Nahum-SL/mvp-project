import IntranetDashboard from "./IntranetDashboard";
import { getLinks } from "./action";

export default async function IntranetDashboardWrapper() {
  const { links } = await getLinks();
  return <IntranetDashboard initialLinks={links} />;
}
