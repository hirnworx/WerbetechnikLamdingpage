import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 py-8 text-sm text-gray-500">
      <div className="mx-auto max-w-5xl px-4">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Printvertise – Werbetechnik</p>
          <nav className="flex gap-4">
            <Link href="/werbetechnik" className="hover:text-gray-700">
              Standorte
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
