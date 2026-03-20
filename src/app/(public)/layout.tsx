import { Suspense } from "react";
import Navbar from "@/src/components/layout/Navbar";
import Footer from "@/src/components/layout/Footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Suspense fallback={<div className="h-20 bg-slate-950" />}>
        <Navbar />
      </Suspense>
      <main className="flex-1">{children}</main>

      <Suspense fallback={<div className="h-20 bg-slate-950" />}>
        <Footer />
      </Suspense>
    </>
  );
}
