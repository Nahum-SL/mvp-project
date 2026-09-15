import { Metadata } from "next";
import { HomeView } from "@/src/modules/public-web/home/views/home-view";

import { getPublicPosts } from "@/src/actions/blog/post-public.query";

export const metadata: Metadata = {
  title: {
    template: "%s | Asescon",
    default: "Asesoría Empresarial y Contable en Perú | ASESCON",
  },
  description: `Nuestra firma está conformada por un grupo humano de primer nivel 
  con más de 30 años de experiencia en el rubro de 
  Asesoramiento Contable, Laboral, Tributario y Financiero, 
  experiencia que ponemos a su servicio para que usted y su empresa cumplan sus objetivos.
  `,
  keywords: [
    "contabilidad",
    "asesoría tributaria",
    "Perú",
    "gestión empresarial",
  ],
  metadataBase: new URL("https://asescon.pe"),
  alternates: {
    canonical: "/",
  },
};

export default async function Home() {
  const posts = await getPublicPosts();
  console.log(posts)

  return (
    <main>
      <HomeView posts={posts} />
    </main>
  );
}
