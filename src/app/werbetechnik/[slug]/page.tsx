import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { generateCityContent, getNearbyCitySlugs, SERVICES } from "@/lib/content";
import LeadForm from "@/components/LeadForm";
import FAQ from "@/components/FAQ";
import NearbyLinks from "@/components/NearbyLinks";
import ServiceCard from "@/components/ServiceCard";
import JsonLd from "@/components/JsonLd";

export const revalidate = 86400;

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getCityBySlug(slug: string) {
  const city = await prisma.city.findUnique({ where: { slug } });
  if (city && city.published) return city;

  const redir = await prisma.slugRedirect.findUnique({
    where: { oldSlug: slug },
    include: { city: true },
  });
  if (redir && redir.city.published) {
    redirect(`/werbetechnik/${redir.city.slug}`);
  }

  return null;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const city = await prisma.city.findUnique({ where: { slug } });
  if (!city) return {};

  const content = generateCityContent(city.cityName, city.slug, city.shortLocalHook);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: { canonical: `/werbetechnik/${city.slug}` },
    openGraph: {
      title: content.metaTitle,
      description: content.metaDescription,
      url: `${baseUrl}/werbetechnik/${city.slug}`,
      siteName: "Printvertise",
      type: "website",
      locale: "de_DE",
    },
    twitter: {
      card: "summary",
      title: content.metaTitle,
      description: content.metaDescription,
    },
  };
}

export default async function CityPage({ params }: PageProps) {
  const { slug } = await params;
  const city = await getCityBySlug(slug);
  if (!city) notFound();

  const content = generateCityContent(city.cityName, city.slug, city.shortLocalHook);

  const allCities = await prisma.city.findMany({
    where: { published: true },
    select: { slug: true, cityName: true },
  });

  const allSlugs = allCities.map((c) => c.slug);
  const nearbySlugs = getNearbyCitySlugs(allSlugs, city.slug, 8);
  const nearbyCities = allCities.filter((c) => nearbySlugs.includes(c.slug));

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const localBusinessLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `Printvertise Werbetechnik ${city.cityName}`,
    description: content.metaDescription,
    url: `${baseUrl}/werbetechnik/${city.slug}`,
    areaServed: {
      "@type": "City",
      name: city.cityName,
    },
    serviceType: "Werbetechnik",
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Werbetechnik", item: `${baseUrl}/werbetechnik` },
      {
        "@type": "ListItem",
        position: 3,
        name: `Werbetechnik ${city.cityName}`,
        item: `${baseUrl}/werbetechnik/${city.slug}`,
      },
    ],
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <JsonLd data={localBusinessLd} />
      <JsonLd data={faqLd} />
      <JsonLd data={breadcrumbLd} />

      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-gray-500">
        <a href="/" className="hover:text-brand-600">Home</a>
        <span className="mx-2">›</span>
        <a href="/werbetechnik" className="hover:text-brand-600">Standorte</a>
        <span className="mx-2">›</span>
        <span className="text-gray-800">{city.cityName}</span>
      </nav>

      {/* H1 */}
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        {content.h1}
      </h1>

      {/* Intro */}
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-gray-600">
        {content.intro}
      </p>

      {/* Services */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-900">{content.serviceSection.heading}</h2>
        <p className="mt-2 max-w-3xl text-gray-600">{content.serviceSection.text}</p>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {SERVICES.map((s) => (
            <ServiceCard key={s} name={s} />
          ))}
        </div>
      </section>

      {/* Trust / Why us */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-900">{content.trust.heading}</h2>
        <ul className="mt-4 space-y-2">
          {content.trust.points.map((p, i) => (
            <li key={i} className="flex items-start gap-2 text-gray-600">
              <svg className="mt-0.5 h-5 w-5 shrink-0 text-brand-500" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* FAQ */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-900">
          Häufige Fragen zu Werbetechnik in {city.cityName}
        </h2>
        <div className="mt-4">
          <FAQ items={content.faq} />
        </div>
      </section>

      {/* CTA + Lead Form */}
      <section id="kontakt" className="mt-12 scroll-mt-24 rounded-xl bg-brand-50 p-6 sm:p-8">
        <h2 className="text-2xl font-semibold text-gray-900">{content.cta.heading}</h2>
        <p className="mt-2 mb-6 text-gray-600">{content.cta.text}</p>
        <LeadForm citySlug={city.slug} cityName={city.cityName} />
      </section>

      {/* Nearby cities */}
      <section className="mt-12">
        <NearbyLinks cities={nearbyCities} />
      </section>
    </div>
  );
}
