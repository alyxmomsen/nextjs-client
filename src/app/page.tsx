import News from "@/components/news/news";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <News />
    </main>
  );
}
