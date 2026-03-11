import Link from "next/link";
export const BlogPostFooter = () => {
  return (
    <footer className="mt-12 p-8 bg-blue-600 rounded-[2.5rem] text-white flex flex-col md:flex-row items-center justify-between gap-6">
      <div>
        <h4 className="text-xl font-black italic">
          ¿Necesitas asesoría personalizada?
        </h4>
        <p className="text-blue-100">
          En ASESCON estamos listos para ayudarte con este y otros temas.
        </p>
      </div>
      <Link
        href="/#contacto"
        className="px-8 py-4 bg-white text-blue-600 font-black rounded-2xl hover:bg-slate-100 transition-colors uppercase text-sm tracking-widest"
      >
        Contactar ahora
      </Link>
    </footer>
  );
};
