"use client";

import { useState } from "react";
import AnimatedButton from "@/src/components/ui/buttons/AnimatedButton";

type ContactFormData = {
  name: string;
  email: string;
  number: string;
  fechaNac: string;
  comment?: string;
};

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    number: "",
    fechaNac: "",
    comment: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Error al enviar contacto");
      }

      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        number: "",
        fechaNac: "",
        comment: "",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error inesperado");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
className="max-w-xl mx-auto bg-white rounded-3xl shadow-2xl shadow-blue-900/10 border border-slate-100 overflow-hidden relative -bottom-10 z-20"    >
      {/* Contenedor interno con padding y spacing */}
      <div className="p-8 md:p-10 flex flex-col space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl text-blue-800">
            Completa tus datos y agenda tu cita
          </h2>
        </div>

        {/* Mensajes */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-lg">
            Mensaje enviado correctamente
          </div>
        )}

        {/* Campos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <input
              name="name"
              required
              placeholder="Nombre Completo"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-700 focus:ring-2 focus:ring-blue-200 outline-none"
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              required
              placeholder="Correo Corporativo / Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-700 focus:ring-2 focus:ring-blue-200 outline-none"
            />
          </div>
          <div>
            <input
              name="number"
              maxLength={9}
              required
              placeholder="Teléfono / WhatsApp"
              value={formData.number}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-700 focus:ring-2 focus:ring-blue-200 outline-none"
            />
          </div>
          <div className="md:col-span-2">
            <input
              type="date"
              name="fechaNac"
              required
              placeholder="Fecha de Nacimiento"
              value={formData.fechaNac}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-700 focus:ring-2 focus:ring-blue-200 outline-none"
            />
          </div>
          <div className="md:col-span-2">
            <textarea
              name="comment"
              rows={4}
              placeholder="Dejanos saber tu opinion / Mensaje"
              value={formData.comment}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 resize-none focus:border-blue-700 focus:ring-2 focus:ring-blue-200 outline-none"
            />
          </div>
        </div>

        {/* Botón */}
        <div className="mt-6">
          <AnimatedButton
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 rounded-lg bg-blue-700 py-3 text-white font-medium hover:bg-blue-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? "Enviando..." : "Enviar Solicitud"}
            <svg
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
              />
            </svg>
          </AnimatedButton>
        </div>
      </div>
    </form>
  );
}
