import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <section className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Werbetechnik, die wirkt.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
          Printvertise ist Ihr Partner für professionelle Beschriftungen, Schilder, Folierungen und
          Leuchtreklame – in ganz Deutschland.
        </p>
        <div className="mt-8">
          <Link
            href="/werbetechnik"
            className="inline-block rounded-md bg-brand-600 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
          >
            Standorte ansehen
          </Link>
        </div>
      </section>
    </div>
  );
}
