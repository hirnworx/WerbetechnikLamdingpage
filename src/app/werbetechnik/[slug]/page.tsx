import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/db";
import { generateCityContent, getNearbyCitySlugs, SERVICES } from "@/lib/content";
import { getHeroImage, ABOUT_IMAGE } from "@/lib/images";
import LeadForm from "@/components/LeadForm";
import FAQ from "@/components/FAQ";
import NearbyLinks from "@/components/NearbyLinks";
import ServiceCard from "@/components/ServiceCard";
import JsonLd from "@/components/JsonLd";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import FadeIn from "@/components/FadeIn";

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
    permanentRedirect(`/werbetechnik/${redir.city.slug}`);
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
  const heroImage = getHeroImage(city.slug);

  const localBusinessLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `Printvertise Werbetechnik ${city.cityName}`,
    description: content.metaDescription,
    url: `${baseUrl}/werbetechnik/${city.slug}`,
    areaServed: { "@type": "City", name: city.cityName },
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
      { "@type": "ListItem", position: 3, name: `Werbetechnik ${city.cityName}`, item: `${baseUrl}/werbetechnik/${city.slug}` },
    ],
  };

  return (
    <>
      <JsonLd data={localBusinessLd} />
      <JsonLd data={faqLd} />
      <JsonLd data={breadcrumbLd} />

      {/* Hero */}
      <HeroSection
        image={heroImage}
        title={content.h1}
        subtitle={content.intro}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Standorte", href: "/werbetechnik" },
          { label: city.cityName },
        ]}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="#kontakt" className="btn-accent !py-4 !px-8">
            Kostenlos anfragen
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
          <Link href="#leistungen" className="btn-outline">
            Leistungen ansehen
          </Link>
        </div>
      </HeroSection>

      {/* Stats */}
      <StatsSection />

      {/* Services */}
      <section id="leistungen" className="section-padding">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <FadeIn>
            <div className="max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-widest text-brand-600">Leistungen</span>
              <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
                {content.serviceSection.heading}
              </h2>
              <p className="mt-4 text-lg text-gray-500">
                {content.serviceSection.text}
              </p>
            </div>
          </FadeIn>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((s, i) => (
              <FadeIn key={s} delay={i * 80}>
                <ServiceCard name={s} index={i} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Trust / Why us */}
      <section className="section-padding bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <FadeIn direction="left">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-brand-600">
                  Warum wir
                </span>
                <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
                  {content.trust.heading}
                </h2>

                <ul className="mt-8 space-y-4">
                  {content.trust.points.map((p, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-600">
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      </span>
                      <span className="text-[15px] text-gray-700">{p}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <Link href="#kontakt" className="btn-primary">
                    Projekt besprechen
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="right" delay={200}>
              <div className="relative">
                <div className="overflow-hidden rounded-3xl shadow-xl">
                  <Image
                    src={ABOUT_IMAGE}
                    alt={`Werbetechnik-Team in ${city.cityName}`}
                    width={800}
                    height={600}
                    className="h-auto w-full object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                {/* Floating badge */}
                <div className="absolute -bottom-5 -left-5 rounded-2xl bg-white p-4 shadow-lg sm:p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 text-brand-600">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">Top bewertet</p>
                      <p className="text-xs text-gray-500">4.9 / 5 Kundenzufriedenheit</p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <FadeIn>
            <div className="text-center">
              <span className="text-xs font-semibold uppercase tracking-widest text-brand-600">FAQ</span>
              <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
                Häufige Fragen zu Werbetechnik in {city.cityName}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-gray-500">
                Hier finden Sie Antworten auf die wichtigsten Fragen rund um unsere Leistungen.
              </p>
            </div>
          </FadeIn>

          <div className="mt-10">
            <FadeIn delay={100}>
              <FAQ items={content.faq} />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA + Lead Form */}
      <section id="kontakt" className="scroll-mt-20 section-padding bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-5">
            {/* Left column: CTA text */}
            <div className="lg:col-span-2">
              <FadeIn direction="left">
                <span className="text-xs font-semibold uppercase tracking-widest text-brand-600">Kontakt</span>
                <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
                  {content.cta.heading}
                </h2>
                <p className="mt-4 text-gray-500">
                  {content.cta.text}
                </p>

                <div className="mt-8 space-y-4">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span>Kostenlose Erstberatung</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span>Antwort innerhalb von 24 Stunden</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                      </svg>
                    </div>
                    <span>Unverbindliches Festpreisangebot</span>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Right column: Form */}
            <div className="lg:col-span-3">
              <FadeIn direction="right" delay={150}>
                <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-lg sm:p-8">
                  <LeadForm citySlug={city.slug} cityName={city.cityName} />
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Nearby cities */}
      <section className="section-padding">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <NearbyLinks cities={nearbyCities} />
        </div>
      </section>
    </>
  );
}
