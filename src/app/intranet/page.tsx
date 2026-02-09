import HeaderIntranet from "@/src/shared/ui/cards/intranet/HeaderIntranet";
import IntranetCardsGrid from "@/src/shared/ui/cards/intranet/IntranetCardsGrid";
import { intranetLinks } from "@/src/shared/types/intranet";

export default function IntranetPage() {
  return (
    <div>
      <section>
        <HeaderIntranet />
      </section>
      <section>
        <IntranetCardsGrid cards={intranetLinks}/>
      </section>
    </div>
  );
}
