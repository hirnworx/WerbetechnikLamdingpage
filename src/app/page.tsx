import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/db";
import { HERO_IMAGES, SERVICE_IMAGES } from "@/lib/images";
import { SERVICES } from "@/lib/content";
import FadeIn from "@/components/FadeIn";
import StatsSection from "@/components/StatsSection";

export const revalidate = 86400;

export default async function Home() {
  const cities = await prisma.city.findMany({
    where: { published: true },
    orderBy: { cityName: "asc" },
    select: { slug: true, cityName: true },
    take: 8,
  });

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-32 sm:py-44 lg:py-52">
        <Image
          src={HERO_IMAGES[0]}
          alt=""
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-brand-950/90 via-brand-900/80 to-brand-800/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-950/40 to-transparent" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium text-white/80 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Jetzt deutschlandweit verfügbar
            </div>

            <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
              Werbetechnik,{" "}
              <span className="bg-gradient-to-r from-accent-300 to-accent-400 bg-clip-text text-transparent">
                die wirkt.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70 sm:text-xl">
              Professionelle Beschriftungen, Schilder, Folierungen und Leuchtreklame –
              direkt in Ihrer Stadt. Erhalten Sie jetzt Ihr kostenfreies Vergleichsangebot.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href="/werbetechnik" className="btn-accent !py-4 !px-8 !text-base">
                Kostenfreies Vergleichsangebot
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <Link href="#leistungen" className="btn-outline !py-4 !px-8 !text-base">
                Leistungen ansehen
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <StatsSection />

      {/* Services */}
      <section id="leistungen" className="section-padding">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <FadeIn>
            <div className="text-center">
              <span className="text-xs font-semibold uppercase tracking-widest text-brand-600">Unser Portfolio</span>
              <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
                Alles aus einer Hand
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-gray-500">
                Von der Idee bis zur Montage – wir bieten Ihnen das komplette Spektrum
                professioneller Werbetechnik.
              </p>
            </div>
          </FadeIn>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((name, i) => (
              <FadeIn key={name} delay={i * 80}>
                <div className="card-elevated group overflow-hidden">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={SERVICE_IMAGES[name]}
                      alt={name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-sm font-semibold text-gray-900 group-hover:text-brand-700 transition-colors">
                      {name}
                    </h3>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Cities preview */}
      <section className="section-padding bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <FadeIn>
            <div className="text-center">
              <span className="text-xs font-semibold uppercase tracking-widest text-brand-600">Standorte</span>
              <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
                In Ihrer Nähe
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-gray-500">
                Wir sind deutschlandweit für Sie da. Finden Sie den Printvertise-Standort in Ihrer Stadt.
              </p>
            </div>
          </FadeIn>

          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {cities.map((city, i) => (
              <FadeIn key={city.slug} delay={i * 60}>
                <Link
                  href={`/werbetechnik/${city.slug}`}
                  className="group card-elevated flex items-center gap-4 px-5 py-5"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900 group-hover:text-brand-700 transition-colors">
                      {city.cityName}
                    </span>
                    <span className="block text-xs text-gray-400">Werbetechnik entdecken →</span>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link href="/werbetechnik" className="btn-primary">
              Alle Standorte ansehen
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <div className="absolute inset-0 gradient-hero" />
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6">
          <FadeIn>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Bereit für Ihren neuen Auftritt?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/70">
              Erhalten Sie jetzt Ihr kostenfreies Vergleichsangebot – transparent,
              unverbindlich und innerhalb von 24 Stunden.
            </p>
            <div className="mt-8">
              <Link href="/werbetechnik" className="btn-accent !py-4 !px-8 !text-base">
                Kostenfreies Vergleichsangebot
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
