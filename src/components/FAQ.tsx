"use client";

interface FaqItem {
  q: string;
  a: string;
}

interface Props {
  items: FaqItem[];
}

export default function FAQ({ items }: Props) {
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <details
          key={i}
          className="group rounded-2xl border border-gray-100 bg-white shadow-card transition-all duration-300 hover:shadow-card-hover open:shadow-card-hover open:border-brand-100"
          {...(i === 0 ? { open: true } : {})}
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-[15px] font-medium text-gray-800 [&::-webkit-details-marker]:hidden">
            <span className="group-open:text-brand-700 transition-colors">{item.q}</span>
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-all group-open:bg-brand-100 group-open:text-brand-600 group-open:rotate-180">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </summary>
          <div className="border-t border-gray-100 px-6 py-5 text-sm leading-relaxed text-gray-600">
            {item.a}
          </div>
        </details>
      ))}
    </div>
  );
}
