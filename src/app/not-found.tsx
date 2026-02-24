import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="text-center">
        <p className="text-sm font-semibold text-brand-600">404</p>
        <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">Seite nicht gefunden</h1>
        <p className="mt-4 text-gray-500">Die angeforderte Seite existiert nicht oder wurde verschoben.</p>
        <div className="mt-8">
          <Link href="/werbetechnik" className="btn-primary">
            Zur Standortübersicht
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
