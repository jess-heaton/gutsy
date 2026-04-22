import { Info } from 'lucide-react';

export default function Disclaimer() {
  return (
    <aside className="mt-10 bg-gray-50 border border-gray-200 rounded-xl p-4 flex gap-3 font-sans">
      <Info className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
      <p className="text-xs text-gray-500 leading-relaxed">
        <strong className="text-gray-700 font-semibold">AI-generated content — not medical advice.</strong> This article was written by an AI and has not been reviewed by a dietitian or doctor. It is for general information only and is not a substitute for individual guidance from a GP or registered dietitian. Always check FODMAP portions against the official Monash University FODMAP app.
      </p>
    </aside>
  );
}
