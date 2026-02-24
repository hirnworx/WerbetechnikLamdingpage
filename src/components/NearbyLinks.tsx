import Link from "next/link";
import FadeIn from "./FadeIn";

interface CityLink {
  slug: string;
  cityName: string;
}

interface Props {
  cities: CityLink[];
}

export default function NearbyLinks({ cities }: Props) {
  if (cities.length === 0) return null;

  return (
    <FadeIn>
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          Werbetechnik in weiteren Städten
        </h2>
        <p className="mt-2 text-gray-500">
          Entdecken Sie unsere Standorte in ganz Deutschland.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {cities.map((c) => (
            <Link
              key={c.slug}
              href={`/werbetechnik/${c.slug}`}
              className="group card-elevated flex items-center gap-3 px-5 py-4"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
              </div>
              <div>
                <span className="text-sm font-semibold text-gray-800 group-hover:text-brand-700 transition-colors">
                  {c.cityName}
                </span>
                <span className="block text-xs text-gray-400">Werbetechnik →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </FadeIn>
  );
}
