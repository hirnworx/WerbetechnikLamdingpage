import Link from "next/link";

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
    <div>
      <h2 className="mb-4 text-lg font-semibold text-gray-800">
        Werbetechnik in weiteren Städten
      </h2>
      <div className="flex flex-wrap gap-2">
        {cities.map((c) => (
          <Link
            key={c.slug}
            href={`/werbetechnik/${c.slug}`}
            className="rounded-full border border-gray-200 bg-white px-4 py-1.5 text-sm text-gray-700 transition-colors hover:border-brand-300 hover:text-brand-700"
          >
            Werbetechnik {c.cityName}
          </Link>
        ))}
      </div>
    </div>
  );
}
