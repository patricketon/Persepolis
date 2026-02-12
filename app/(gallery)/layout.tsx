import NavBar from "@/components/Navigation/NavBar";
import HomeButton from '@/components/Navigation/HomeButton'

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar/>
      {children}
    </>
  );
}