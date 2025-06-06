import Link from "next/link";

export default function Home() {
  return (
    <div className="text-center font-[family-name:var(--font-geist-sans)]">
      <h2 className="text-3xl font-bold mb-4">Welcome to Tanish Property</h2>
      <p className="text-lg mb-6">Find your dream home with us. Explore our latest properties!</p>
      <Link
        href="/posts"
        className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
      >
        View Properties
      </Link>
    </div>
  );
}