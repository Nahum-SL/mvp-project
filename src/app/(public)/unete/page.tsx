import UneteHero from "@/src/features/public-web/unete/UneteHero";
import { UneteForm } from "@/src/features/public-web/unete/components/UneteForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trabaja con Nosotros",
  description: `
  Buscamos talento como tú para formar parte de nuestro equipo. 
  ¡Únete y crezcamos juntos! Imagen de ejemplo. Dejanos tus datos. 
  ¡Te contactaremos pronto!`,
};

// Se reformara esta exibicion de la data
export default function UnetePage() {
  return (
    <main>
      <UneteHero
        title="Forma parte de nuestra historia"
        subtitle="Talento que inspira"
        src="/unete-header.webp"
        alt="Tenemos un espacio para ti"
      />
      <UneteForm
        title="Dejanos tus datos"
        subtitle="¡Te contactaremos pronto!"
        src="/trabaja-con-nosotros.webp"
        alt="Dejanos tus datos"
      />
    </main>
  );
}
