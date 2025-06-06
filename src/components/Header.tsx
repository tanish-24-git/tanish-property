import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-blue-600 text-white p-4 font-[family-name:var(--font-geist-sans)]">
      <nav className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Tanish Property</h1>
        <ul className="flex space-x-4">
          <li><Link href="/" className="hover:underline">Home</Link></li>
          <li><Link href="/posts" className="hover:underline">Properties</Link></li>
        </ul>
      </nav>
    </header>
  );
}