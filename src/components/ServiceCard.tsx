const SERVICE_ICONS: Record<string, string> = {
  "Fahrzeugbeschriftung": "🚗",
  "Schaufensterbeschriftung": "🏪",
  "Schilder & Tafeln": "📋",
  "Leuchtreklame": "💡",
  "Messebau & Displays": "🎪",
  "Folierung & Vollverklebung": "🎨",
  "Werbebanner & Planen": "🏳️",
  "Praxisschilder & Firmenschilder": "🏢",
};

interface Props {
  name: string;
}

export default function ServiceCard({ name }: Props) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 text-center transition-shadow hover:shadow-md">
      <div className="mb-2 text-2xl">{SERVICE_ICONS[name] || "✦"}</div>
      <p className="text-sm font-medium text-gray-800">{name}</p>
    </div>
  );
}
