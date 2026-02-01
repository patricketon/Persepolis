// app/(app)/layout.tsx
import NavBar from "../../components/Navigation/NavBar"

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
}
