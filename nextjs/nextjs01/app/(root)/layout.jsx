import Navtigation from "@/components/Navigation";

export default function MainLayout({ children }) {
  return (
    <>
      <header>
        HEADER
        <Navtigation />
      </header>
      <main className="container mx-auto px-4">{children}</main>
      <footer>FOOTER</footer>
    </>
  );
}
