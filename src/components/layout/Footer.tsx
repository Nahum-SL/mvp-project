'use client';
// src/components/ui/layout/Footer.tsx
import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  Phone,
  MessageCircle,
  MapPin,
  Clock,
} from "lucide-react";
import { FaFacebookF } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
          {/* Columna 1: Logo y Bio */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Link
              href="/#home"
              className="flex"
              >
              
              <span className="text-2xl font-black hover:text-blue-700 text-white tracking-tighter">
                Asescon
              </span>
              </Link>
            </div>
            <p className="text-sm leading-relaxed text-slate-400 max-w-sm">
              Asesoría contable, tributaria y laboral para empresas y
              emprendedores.
               Gestionamos tu contabilidad y obligaciones fiscales
              con profesionalismo y confianza.
            </p>
            <div className="flex gap-4">
              <Link
                href="https://facebook.com"
                target="_blank"
                className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all"
              >
                <FaFacebookF size={18} />
              </Link>
            </div>
          </div>

          {/* Columna 2: Contacto Rápido */}
          <div className="space-y-6">
            <h4 className="text-white font-black uppercase italic tracking-widest text-xs">
              Contacto
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:contacto@asescon.pe"
                  className="flex items-center gap-3 hover:text-blue-400 transition-colors"
                >
                  <Mail size={18} className="text-blue-500" />
                  <span className="text-sm">contacto@asescon.pe</span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/51974770644"
                  target="_blank"
                  className="flex items-center gap-3 hover:text-green-400 transition-colors"
                >
                  <MessageCircle size={18} className="text-green-500" />
                  <span className="text-sm">(+51) 974 770 644</span>
                </a>
              </li>
              <li>
                <div className="flex items-center gap-3">
                  <Phone size={18} className="text-blue-500" />
                  <span className="text-sm">
                    (01) 741 0157{" "}
                    <span className="text-[10px] uppercase opacity-50 ml-1">
                      Central
                    </span>
                  </span>
                </div>
              </li>
              <li>
                <div className="flex items-center gap-3">
                  <Clock size={18} className="text-blue-500" />
                  <span className="text-sm italic">
                    Lun - Vie | 08:00 - 20:00
                  </span>
                </div>
              </li>
            </ul>
          </div>

          {/* Columna 3: Sedes */}
          <div className="space-y-6">
            <h4 className="text-white font-black uppercase italic tracking-widest text-xs">
              Nuestras Sedes
            </h4>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin size={18} className="text-blue-500 shrink-0" />
                <span className="text-sm leading-tight text-slate-400">
                  <strong className="text-slate-200 block mb-1">
                    Surco, Lima
                  </strong>
                  Av. Tomásal 475, Urb. Las Lagunas.
                </span>
              </li>
              <li className="flex gap-3">
                <MapPin size={18} className="text-blue-500 shrink-0" />
                <span className="text-sm leading-tight text-slate-400">
                  <strong className="text-slate-200 block mb-1">
                    Chincha, Ica
                  </strong>
                  Av. Luis Gálvez Ronceros 143 / Av. Primavera 236.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Línea Divisoria y Copyright */}
        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
          <p>© {currentYear} ASESCON. Todos los derechos reservados.</p>
          <p className="italic">
            MVP Prototipo —{" "}
            <span className="text-slate-300">Nahum Salazar Levano</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
