import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { AlbumInfo } from "@/components/AlbumInfo";
import { AlbumShowcase } from "@/components/AlbumShowcase";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <AlbumShowcase />
      <AlbumInfo />
      <Footer />
    </main>
  );
}
