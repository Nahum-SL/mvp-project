export default async function RootAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main>
        {/* 3. Envolvemos el children en Suspense para satisfacer a Next.js 15 */}
        {children}
      </main>
    </>
  );
}
