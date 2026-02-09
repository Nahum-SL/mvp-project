import Link from "next/link";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center bg-white rounded-2xl shadow-lg border border-gray-200 p-8 space-y-6">
        <AlertTriangle className="mx-auto h-10 w-10 text-blue-700" />
        {/* Código */}
        <h1 className="text-6xl font-bold text-blue-900">404</h1>

        {/* Mensaje */}
        <h2 className="text-xl font-semibold text-gray-900">
          Página no encontrada
        </h2>

        <p className="text-gray-600 text-sm">
          Lo sentimos, la página que estás buscando no existe o fue removida.
        </p>

        {/* CTA */}
        <Link
          href="/"
          className="
            inline-flex items-center justify-center
            w-full rounded-lg
            bg-blue-700 py-3
            text-white font-medium
            hover:bg-blue-800
            transition-colors
          "
        >
          Volver al inicio
        </Link>
      </div>
    </section>
  );
}
