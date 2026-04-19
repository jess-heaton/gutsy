import { Info } from 'lucide-react';

export default function Disclaimer() {
  return (
    <aside className="mt-10 bg-gray-50 border border-gray-200 rounded-xl p-4 flex gap-3 font-sans">
      <Info className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
      <p className="text-xs text-gray-500 leading-relaxed">
        <strong className="text-gray-700 font-semibold">Not medical advice.</strong> This article is for general information and is not a substitute for individual guidance from a GP or registered dietitian. The low-FODMAP diet is best done under professional supervision, particularly during the reintroduction phase.
      </p>
    </aside>
  );
}
