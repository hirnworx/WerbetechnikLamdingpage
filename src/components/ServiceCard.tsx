import Image from "next/image";
import { SERVICE_IMAGES, SERVICE_DESCRIPTIONS } from "@/lib/images";

interface Props {
  name: string;
  index?: number;
}

export default function ServiceCard({ name, index = 0 }: Props) {
  const image = SERVICE_IMAGES[name];
  const description = SERVICE_DESCRIPTIONS[name];

  return (
    <div
      className="card-elevated group overflow-hidden"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {image && (
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>
      )}
      <div className="p-5">
        <h3 className="text-sm font-semibold text-gray-900 group-hover:text-brand-700 transition-colors">
          {name}
        </h3>
        {description && (
          <p className="mt-1.5 text-xs leading-relaxed text-gray-500">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
