import HomeButton from "@/components/Navigation/HomeButton";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HomeButton />
      {children}
    </>
  );
}