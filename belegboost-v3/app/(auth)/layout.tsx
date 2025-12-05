export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Auth pages are standalone (no navbar/footer)
  return <>{children}</>;
}
