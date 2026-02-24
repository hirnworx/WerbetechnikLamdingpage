interface FaqItem {
  q: string;
  a: string;
}

interface Props {
  items: FaqItem[];
}

export default function FAQ({ items }: Props) {
  return (
    <div className="space-y-4">
      {items.map((item, i) => (
        <details
          key={i}
          className="group rounded-lg border border-gray-200 bg-white"
          {...(i === 0 ? { open: true } : {})}
        >
          <summary className="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-medium text-gray-800 hover:text-brand-700">
            <span>{item.q}</span>
            <svg
              className="h-4 w-4 shrink-0 text-gray-400 transition-transform group-open:rotate-180"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="border-t border-gray-100 px-5 py-4 text-sm leading-relaxed text-gray-600">
            {item.a}
          </div>
        </details>
      ))}
    </div>
  );
}
