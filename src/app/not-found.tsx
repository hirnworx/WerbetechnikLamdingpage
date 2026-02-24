import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-24 text-center">
      <h1 className="text-6xl font-bold text-gray-300">404</h1>
      <p className="mt-4 text-lg text-gray-600">Diese Seite wurde nicht gefunden.</p>
      <Link
        href="/werbetechnik"
        className="mt-6 inline-block rounded-md bg-brand-600 px-6 py-2 text-sm font-semibold text-white hover:bg-brand-700"
      >
        Zurück zur Standortübersicht
      </Link>
    </div>
  );
}
