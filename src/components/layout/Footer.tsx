"use client";
// src/components/ui/layout/Footer.tsx
import Link from "next/link";
import {
  Mail,
  MessageCircle,
  MapPin,
  Clock,
  ArrowUpRight,
  ExternalLink,
} from "lucide-react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // URLs de Google Maps (Coordenadas o Direcciones exactas)
  const locations = [
    {
      city: "Surco, Lima",
      address:
        "Av. Tomásal 475, Urbanización Las Lagunas, Santiago de Surco, Lima.",
      // Reemplaza con el link de compartir de Google Maps de tu oficina
      mapUrl: "",
    },
    {
      city: "Chincha, Ica",
      address: "Av. Gálvez Ronceros 143 / Av. Primavera 236.",
      mapUrl:
        "https://www.google.com/maps/search/?api=1&query=Av.+Gálvez+Ronceros+143+Chincha+Ica",
    },
    {
      city: "Pueblo Nuevo, Chincha",
      address: "Av. Primavera 236, Pueblo Nuevo, Chincha",
      mapUrl: "",
    },
  ];

  const footerLinks = [
    { name: "Inicio", href: "/#home" },
    { name: "Nosotros", href: "/nosotros" },
    { name: "Servicios", href: "/servicio" },
    { name: "Recursos", href: "/blog" },
    { name: "Contacto", href: "/#contacto" },
  ];

  return (
    <footer
      className="bg-slate-950 text-slate-300 relative 
    overflow-hidden border-t border-slate-900"
    >
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 
      w-full h-px bg-linear-to-r from-transparent via-sky-500/50 to-transparent"
      />

      <div className="max-w-7xl mx-auto px-6 pt-20 pb-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Columna 1: Brand & Bio */}
          <div className="space-y-8">
            <Link href="/#home" className="inline-block group">
              <span className="text-3xl font-extrabold text-white tracking-tighter group-hover:text-sky-500 transition-colors">
                Asescon<span className="text-sky-500">.</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400 font-medium">
              Estrategia contable y blindaje legal con enfoque tecnológico.
              Transformamos la gestión administrativa en una ventaja competitiva
              para tu empresa.
            </p>
            <div className="flex gap-3">
              {[
                {
                  icon: <FaFacebookF />,
                  href: "https://www.facebook.com/asescon.pe",
                },
                {
                  icon: <FaInstagram />,
                  href: "https://www.instagram.com/asescon.pe",
                },
              ].map((social, i) => (
                <Link
                  key={i}
                  href={social.href}
                  className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center hover:bg-sky-600 hover:text-white hover:-translate-y-1 transition-all duration-300"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Columna 2: Navegación */}
          <div className="space-y-6">
            <h4 className="text-white font-extrabold uppercase tracking-[0.4em] text-xs">
              Explorar
            </h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-sm text-slate-400 hover:text-sky-400 transition-colors"
                  >
                    <ArrowUpRight
                      size={12}
                      className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0"
                    />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3: Contacto */}
          <div className="space-y-6">
            <h4 className="text-white font-extrabold uppercase tracking-[0.2em] text-xs">
              Soporte Directo
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:contacto@asescon.pe"
                  className="group flex items-center gap-3 hover:text-sky-400 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-sky-500/10 flex items-center justify-center text-sky-500 group-hover:bg-sky-500 group-hover:text-white transition-all">
                    <Mail size={16} />
                  </div>
                  <span className="text-sm font-medium">
                    contacto@asescon.pe
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/51974770644"
                  target="_blank"
                  className="group flex items-center gap-3 hover:text-emerald-400 transition-colors"
                >
                  <div
                    className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center 
                  text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all"
                  >
                    <MessageCircle size={16} />
                  </div>
                  <span className="text-sm font-medium">(+51) 974 770 644</span>
                </a>
              </li>
              <li className="flex items-center gap-3 text-slate-400">
                <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-500">
                  <Clock size={16} />
                </div>
                <span className="text-xs">Lun - Vie | 08:00 - 20:00</span>
              </li>
            </ul>
          </div>

          {/* Columna 4: Ubicaciones con Google Maps API Links */}
          <div className="space-y-6">
            <h4 className="text-white font-extrabold uppercase tracking-[0.2em] text-xs">
              Ubicaciones
            </h4>
            <div className="space-y-6">
              {locations.map((loc, idx) => (
                <a
                  key={idx}
                  href={loc.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-3 group cursor-pointer"
                >
                  <div className="mt-1">
                    <MapPin
                      size={18}
                      className="text-sky-500 shrink-0 group-hover:animate-bounce transition-all"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <strong className="text-slate-100 block text-sm uppercase tracking-tight group-hover:text-sky-400 transition-colors">
                        {loc.city}
                      </strong>
                      <ExternalLink
                        size={10}
                        className="text-slate-600 group-hover:text-sky-500 opacity-0 group-hover:opacity-100 transition-all"
                      />
                    </div>
                    <p className="text-xs leading-relaxed text-slate-400 group-hover:text-slate-300 transition-colors">
                      {loc.address}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500">
          <div className="flex items-center gap-4">
            <p>© {currentYear} ASESCON</p>
            <span className="w-1 h-1 bg-slate-800 rounded-full" />
            <p className="text-slate-600 uppercase">RUC: 20452303531</p>
          </div>

          <p className="flex items-center gap-2">
            <span className="text-slate-700">Powered by</span>
            <span className="text-slate-300 group hover:text-sky-400 transition-colors cursor-default">
              Nahum Salazar <span className="text-sky-500">/</span> Dev
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
