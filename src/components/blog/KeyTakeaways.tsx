import { Check } from 'lucide-react';

export default function KeyTakeaways({ items }: { items: string[] }) {
  return (
    <section aria-labelledby="takeaways-heading" className="my-8 bg-gradient-to-br from-brand-50 to-white border border-brand-100 rounded-2xl p-6">
      <p id="takeaways-heading" className="text-xs font-bold text-brand-700 uppercase tracking-widest mb-3">
        Key takeaways
      </p>
      <ul className="space-y-2.5 font-sans">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm text-gray-800 leading-relaxed">
            <span className="w-5 h-5 rounded-full bg-brand-700 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Check className="w-3 h-3 text-white" strokeWidth={3} />
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
