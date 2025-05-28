import Link from "next/link";

type Props = {
  children: React.ReactNode;
};

export default function PlaybackLayout({ children }: Props) {
  return (
    <main className="h-screen">
      <div className="w-[90%] max-w-6xl mx-auto py-8 space-y-4">
        <header className="flex items-center justify-center gap-2">
          <Link href="/">Home</Link>
          <p className="text-gray-500"> / </p>
          <p>Playback</p>
        </header>
        <section className="flex flex-col gap-8 items-center">{children}</section>
      </div>
    </main>
  );
}
