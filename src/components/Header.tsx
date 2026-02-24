import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-bold text-brand-700">
          Printvertise
        </Link>
        <nav className="flex gap-6 text-sm font-medium text-gray-600">
          <Link href="/werbetechnik" className="hover:text-brand-700 transition-colors">
            Standorte
          </Link>
          <Link href="#kontakt" className="hover:text-brand-700 transition-colors">
            Kontakt
          </Link>
        </nav>
      </div>
    </header>
  );
}
