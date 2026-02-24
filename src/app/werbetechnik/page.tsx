import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/db";
import JsonLd from "@/components/JsonLd";
import HeroSection from "@/components/HeroSection";
import FadeIn from "@/components/FadeIn";
import { HERO_IMAGES } from "@/lib/images";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Werbetechnik in Ihrer Stadt – Alle Standorte | Printvertise",
  description:
    "Finden Sie professionelle Werbetechnik in Ihrer Nähe. Beschriftung, Schilder, Folierung und Leuchtreklame – Printvertise ist deutschlandweit für Sie da.",
  alternates: { canonical: "/werbetechnik" },
};

export default async function WerbetechnikIndex() {
  const cities = await prisma.city.findMany({
    where: { published: true },
    orderBy: { cityName: "asc" },
    select: { slug: true, cityName: true, region: true },
  });

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Werbetechnik Standorte", item: `${baseUrl}/werbetechnik` },
    ],
  };

  const grouped = cities.reduce<Record<string, typeof cities>>((acc, c) => {
    const key = c.region || "Weitere";
    if (!acc[key]) acc[key] = [];
    acc[key].push(c);
    return acc;
  }, {});

  const regionKeys = Object.keys(grouped).sort();

  return (
    <>
      <JsonLd data={breadcrumbLd} />

      <HeroSection
        image={HERO_IMAGES[2]}
        title="Werbetechnik in Ihrer Stadt"
        subtitle="Wir sind deutschlandweit für Sie da. Wählen Sie Ihren Standort und erfahren Sie mehr über unsere Leistungen vor Ort."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Standorte" },
        ]}
        compact
      />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        {/* Search hint */}
        <FadeIn>
          <div className="mb-12 flex items-center gap-3 rounded-2xl border border-brand-100 bg-brand-50/50 p-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-100 text-brand-600">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-brand-900">
                {cities.length} Standorte in {regionKeys.length} Bundesländern
              </p>
              <p className="text-xs text-brand-700/60">
                Wählen Sie Ihre Stadt für ein individuelles Angebot
              </p>
            </div>
          </div>
        </FadeIn>

        {/* Regions */}
        <div className="space-y-14">
          {regionKeys.map((region, ri) => (
            <FadeIn key={region} delay={ri * 60}>
              <section>
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-500">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </div>
                  <h2 className="text-lg font-bold text-gray-900">{region}</h2>
                  <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-500">
                    {grouped[region].length}
                  </span>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {grouped[region].map((city) => (
                    <Link
                      key={city.slug}
                      href={`/werbetechnik/${city.slug}`}
                      className="group card-elevated flex items-center gap-4 px-5 py-5"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-all group-hover:bg-brand-600 group-hover:text-white group-hover:shadow-md group-hover:shadow-brand-600/25">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="font-semibold text-gray-900 group-hover:text-brand-700 transition-colors">
                          {city.cityName}
                        </span>
                        <span className="block truncate text-xs text-gray-400">Werbetechnik & Beschriftung →</span>
                      </div>
                      <svg className="h-5 w-5 text-gray-300 transition-all group-hover:text-brand-500 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </Link>
                  ))}
                </div>
              </section>
            </FadeIn>
          ))}
        </div>

        {cities.length === 0 && (
          <p className="mt-8 text-center text-gray-500">Noch keine Standorte verfügbar.</p>
        )}
      </div>
    </>
  );
}
