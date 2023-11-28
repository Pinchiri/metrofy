import Divider from "@/components/Divider/Divider";
import Hero from "@/components/Hero/Hero";
import SongCard from "@/components/SongCard/SongCard";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between mb-10">
      <Hero />
      <Divider />
    </main>
  );
}
