/* eslint-disable @typescript-eslint/no-explicit-any */
import { JobAppStatus } from "@/src/types/unete/unete";

async function getApplications() {
  const res = await fetch(`${process.env.NEST_API_URL}/unete`, {
    cache: "no-store",
  });
  return res.json();
}

export default async function UneteAdminPage() {
  const apps = await getApplications();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-black text-slate-900 italic">
          Postulaciones{" "}
          <span className="text-blue-600 not-italic">Recibidas</span>
        </h2>
        <p className="text-slate-500 text-sm">
          Gestiona el talento que quiere unirse a ASESCON.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-900 text-white text-[10px] uppercase tracking-widest">
            <tr>
              <th className="px-6 py-4">Candidato</th>
              <th className="px-6 py-4">Puesto</th>
              <th className="px-6 py-4">DNI / Teléfono</th>
              <th className="px-6 py-4">CV</th>
              <th className="px-6 py-4">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {apps.map((app: any) => (
              <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <p className="font-bold text-slate-900">{app.fullName}</p>
                  <p className="text-xs text-slate-500">{app.email}</p>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  {app.position}
                </td>
                <td className="px-6 py-4 text-xs text-slate-500">
                  {app.dni} <br /> {app.phone}
                </td>
                <td className="px-6 py-4">
                  <a
                    href={app.cvUrl}
                    target="_blank"
                    className="bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest hover:bg-slate-900 transition-colors"
                  >
                    Ver CV
                  </a>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs font-bold uppercase tracking-widest px-2 py-1 bg-slate-100 rounded-full text-slate-500">
                    {app.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
