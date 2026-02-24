import Link from "next/link";

const services = [
  "Fahrzeugbeschriftung",
  "Schaufensterbeschriftung",
  "Schilder & Tafeln",
  "Leuchtreklame",
  "Folierung & Vollverklebung",
  "Werbebanner & Planen",
];

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600">
                <span className="text-lg font-bold text-white">P</span>
              </div>
              <span className="text-lg font-bold text-gray-900">Printvertise</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-gray-500">
              Ihr Partner für professionelle Werbetechnik in ganz Deutschland.
              Beschriftung, Schilder, Folierung und Leuchtreklame.
            </p>
          </div>

          {/* Leistungen */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Leistungen
            </h4>
            <ul className="mt-4 space-y-2.5">
              {services.map((s) => (
                <li key={s}>
                  <span className="text-sm text-gray-600 hover:text-brand-600 transition-colors cursor-default">
                    {s}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Navigation
            </h4>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link href="/" className="text-sm text-gray-600 hover:text-brand-600 transition-colors">
                  Startseite
                </Link>
              </li>
              <li>
                <Link href="/werbetechnik" className="text-sm text-gray-600 hover:text-brand-600 transition-colors">
                  Alle Standorte
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-sm text-gray-600 hover:text-brand-600 transition-colors">
                  Admin
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Kontakt
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                info@printvertise.de
              </li>
              <li className="flex items-center gap-2">
                <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                0800 123 45 67
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-8 sm:flex-row">
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} Printvertise. Alle Rechte vorbehalten.
          </p>
          <div className="flex gap-6 text-xs text-gray-400">
            <span className="hover:text-gray-600 cursor-default transition-colors">Datenschutz</span>
            <span className="hover:text-gray-600 cursor-default transition-colors">Impressum</span>
            <span className="hover:text-gray-600 cursor-default transition-colors">AGB</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
