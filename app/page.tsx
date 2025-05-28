import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Link href="/catalog">Catalog</Link>
      <Link href="/content/1">Content</Link>
      <Link href="/play/1">Play</Link>
      <Link href="/my-list">My List / favorites</Link>
    </div>
  );
}
