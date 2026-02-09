import LogosCarrusel from "../shared/ui/logos-carrusel";
import CardTitle from "../shared/ui/cards/CardTitle";
import { logos } from "../shared/types/logos";

export default function Home() {
  return (
    <div>
      <section className="text-center"><CardTitle title="HOME" subtitle="Bienvenido a nuestro sitio web"/></section>
      <section className="py-12 space-y-8">
        <LogosCarrusel
          title="ALGUNOS DE NUESTROS CLIENTES"
          images={logos}
        />
      </section>
    </div>
  );
}
