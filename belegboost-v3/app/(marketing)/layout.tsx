export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Marketing pages use PageWrapper component which includes Navbar + Footer
  // This layout is minimal - just passes through children
  return <>{children}</>;
}
