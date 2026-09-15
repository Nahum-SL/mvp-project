"use client";
import { Suspense } from "react";
// Skeleton
import { RecentPostSkeleton } from "@/src/components/skeletons/RecentPostSkeleton";
// Componentes de la página
import { AsesconHero } from "../components/AsesconHero";
import { ContactForm } from "@/src/modules/public/contacto/components/ContactForm";
import { FeaturedServices } from "../components/FeaturedServices";
import { ValueProposition } from "../components/ValueProposition";
import { RecentPostsSection } from "../components/RecentPostSection";
// Componente header
import { SectionHeaderHome } from "../components/SectionHeaderHome";
import type { BlogPost } from "@/src/types/blog/blogPost";

interface HomeViewProps {
  posts: BlogPost[];
}

export function HomeView({ posts }: HomeViewProps) {
  return (
    <main className="bg-white text-slate-900">
      <div className="relative z-15">
        {/* 1. HERO: Impacto visual inicial */}
        <AsesconHero
          mainTitle="Impulsamos el crecimiento de su empresa"
          subtitle="Respaldo estratégico y seguridad jurídica para una operación con total tranquilidad."
          ctaText="Hablar con un asesor"
        />

        {/* 2. SERVICIOS POPULARES: El "catálogo" de soluciones - Estatico no usa fetchs al backend*/}
        <section className="bg-slate-50 z-14">
          <FeaturedServices />
        </section>

        {/* Usamos colores Blanco, Azul y acentos Amarillos */}
        <ValueProposition />

        {/* 4. CONTENIDO: Posts recientes para SEO y autoridad - usa un hook para intermediar por el route.ts y llegar al backend*/}
        <Suspense fallback={<RecentPostSkeleton />}>
          <RecentPostsSection posts={posts} />
        </Suspense>

        {/* 5. CONTACTO: Cierre de embudo */}
        <div className="relative z-9 bg-white">
          <SectionHeaderHome
            title="¿Listo para comenzar?"
            description="Únete a las empresas que ya han transformado su gestión con el respaldo estratégico de ASESCON"
            lineColor="green"
            mode="light"
          />
          <section id="contacto" className="pb-20">
            <div className="container mx-auto px-6">
              <ContactForm />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
