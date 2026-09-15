import { handleResponse } from "@/src/lib/handle-response";
import { getBaseUrl } from "@/src/lib/get-base-url";
import type { IntranetLinks } from "@/src/types/intranet/intranet-types";

// el fetch ocurre dentro de un page.tsx o Server Component para SEO:
export async function getPublicIntranetLinks(): Promise<IntranetLinks[]> {
  const res = await fetch(`${getBaseUrl()}/api/public/intranet`);
  return handleResponse<IntranetLinks[]>(res);
}
