"use client";
// Components
import UneteHero from "../components/unete-hero";
import { UneteForm } from "../components/unete-form";

export function UneteView() {
  return (
    <div>
      <UneteHero
        title="Forma parte de nuestra historia"
        subtitle="Talento que inspira"
        src="/unete-header.webp"
        alt="Tenemos un espacio para ti"
      />
      <UneteForm
        title="Déjanos tus datos"
        subtitle="¡Te contactaremos pronto!"
        src="/trabaja-con-nosotros.webp"
        alt="Déjanos tus datos"
      />
    </div>
  );
}
