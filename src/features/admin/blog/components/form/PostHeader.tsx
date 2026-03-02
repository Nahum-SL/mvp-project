// src/features/admin/blog/components/form/PostHeader.tsx
export const PostHeader = ({ disabled }: { disabled: boolean }) => (
  <div className="space-y-4">
    <input
      name="title"
      disabled={disabled}
      placeholder="Título impactante del post..."
      className="w-full bg-transparent text-4xl font-black focus:outline-none border-b-2 border-slate-100 focus:border-blue-600 transition-all pb-4 placeholder:text-slate-300 disabled:opacity-50"
      required
    />
    <textarea
      name="excerpt"
      disabled={disabled}
      placeholder="Resumen ejecutivo para SEO..."
      className="w-full p-6 bg-slate-50 rounded-[2rem] focus:outline-none focus:ring-2 focus:ring-blue-100 resize-none text-slate-600 italic border border-transparent focus:border-blue-200 transition-all disabled:opacity-50"
      rows={3}
      required
    />
  </div>
);
