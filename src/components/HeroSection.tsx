import Image from "next/image";

interface Props {
  image: string;
  title: string;
  subtitle?: string;
  breadcrumbs?: { label: string; href?: string }[];
  children?: React.ReactNode;
  compact?: boolean;
}

export default function HeroSection({ image, title, subtitle, breadcrumbs, children, compact }: Props) {
  return (
    <section className={`relative overflow-hidden ${compact ? "py-20 sm:py-28" : "py-28 sm:py-40"}`}>
      {/* Background image */}
      <Image
        src={image}
        alt=""
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-950/90 via-brand-900/80 to-brand-800/70" />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-950/50 to-transparent" />

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="mb-6 flex items-center gap-2 text-sm text-white/60">
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-2">
                {i > 0 && (
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                )}
                {crumb.href ? (
                  <a href={crumb.href} className="hover:text-white transition-colors">
                    {crumb.label}
                  </a>
                ) : (
                  <span className="text-white/90">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        <h1 className="max-w-4xl text-3xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75 sm:text-xl">
            {subtitle}
          </p>
        )}

        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
