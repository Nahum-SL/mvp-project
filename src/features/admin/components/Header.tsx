export default function AdminHeader() {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8">
      <h1 className="text-sm font-medium text-slate-500 uppercase tracking-widest">
        Panel de Control
      </h1>
      <div className="flex items-center gap-4">
        <span className="text-xs font-bold text-slate-900 italic">
          ADMIN_ASESCON
        </span>
        <div className="w-8 h-8 rounded-full bg-blue-600" />
      </div>
    </header>
  );
}
