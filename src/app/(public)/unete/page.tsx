import { UneteView } from "@/src/features/public/unete/views/unete-view";
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
      <UneteView />
    </main>
  );
}
