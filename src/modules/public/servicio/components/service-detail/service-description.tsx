// src/features/public/servicio/components/servicio-detail/service-description.tsx

interface ServiceDescriptionProps {
  description: string;
}

export function ServiceDescription({ description }: ServiceDescriptionProps) {
  return (
    <section className="max-w-none mb-16">
      <h2 className="text-3xl font-medium text-slate-900 mb-8 tracking-tight uppercase">
        Sobre el Servicio
      </h2>

      <div className="prose prose-slate prose-lg">
        {/* El HTML ya viene gestionado desde CMS/backend */}
        <div
          className="text-slate-600 leading-relaxed font-medium"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
    </section>
  );
}
