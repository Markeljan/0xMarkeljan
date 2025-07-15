import HighlightGrid from "@/components/HighlightGrid";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 space-y-6">
      <h1 className="text-4xl font-bold">Markeljan Sokoli (soko.eth)</h1>
      <p>Scroll and click a tile to learn more about my journey.</p>
      <HighlightGrid />
    </main>
  );
}
