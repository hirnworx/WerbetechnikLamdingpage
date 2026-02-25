import FadeIn from "./FadeIn";

const stats = [
  { value: "500+", label: "Projekte realisiert" },
  { value: "15+", label: "Jahre Erfahrung" },
  { value: "100%", label: "Kostenlos & unverbindlich" },
  { value: "24h", label: "Vergleichsangebot" },
];

export default function StatsSection() {
  return (
    <section className="relative -mt-12 z-10 mx-auto max-w-7xl px-4 sm:px-6">
      <FadeIn>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="card-elevated flex flex-col items-center px-4 py-6 text-center sm:px-6 sm:py-8"
            >
              <span className="text-2xl font-bold text-brand-700 sm:text-3xl lg:text-4xl">
                {stat.value}
              </span>
              <span className="mt-1.5 text-xs font-medium text-gray-500 sm:text-sm">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}
