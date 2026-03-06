export default async function IntranetLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      {/* Tu Sidebar aquí */}
      <main className="flex-1">{children}</main>
    </div>
  );
}
