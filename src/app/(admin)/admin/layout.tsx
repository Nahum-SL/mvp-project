"use client";

import { useState } from "react";
import { Sidebar } from "@/src/features/admin/components/Sidebar";
import NavbarAdmin from "@/src/features/admin/components/NavbarAdmin";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar - Se controla desde aquí */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Navbar - Recibe la función para abrir el sidebar */}
        <NavbarAdmin onOpenSidebar={() => setIsSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto p-4 md:p-8 ">{children}</main>
      </div>
    </div>
  );
}
