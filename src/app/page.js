import SongCard from "@/components/SongCard/SongCard";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SongCard
        title="MÓNACO"
        artist="Bad Bunny"
        gender="Trap"
        duration="2:50"
        rating="4"
      />
    </main>
  );
}
