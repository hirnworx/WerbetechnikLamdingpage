import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/db";
import JsonLd from "@/components/JsonLd";

export const revalidate = 86400; // 24 h

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
    <div className="mx-auto max-w-5xl px-4 py-12">
      <JsonLd data={breadcrumbLd} />

      <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
        Werbetechnik in Ihrer Stadt
      </h1>
      <p className="mt-3 max-w-2xl text-gray-600">
        Wir sind deutschlandweit für Sie da. Wählen Sie Ihren Standort und erfahren Sie mehr über
        unsere Leistungen vor Ort.
      </p>

      <div className="mt-10 space-y-10">
        {regionKeys.map((region) => (
          <section key={region}>
            <h2 className="mb-4 text-lg font-semibold text-gray-700">{region}</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {grouped[region].map((city) => (
                <Link
                  key={city.slug}
                  href={`/werbetechnik/${city.slug}`}
                  className="rounded-lg border border-gray-200 bg-white px-5 py-4 transition-shadow hover:shadow-md"
                >
                  <span className="font-medium text-brand-700">{city.cityName}</span>
                  <span className="ml-2 text-xs text-gray-400">→ Werbetechnik</span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>

      {cities.length === 0 && (
        <p className="mt-8 text-gray-500">Noch keine Standorte verfügbar.</p>
      )}
    </div>
  );
}
