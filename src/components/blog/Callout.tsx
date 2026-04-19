import { Info, Lightbulb, AlertTriangle, CheckCircle2 } from 'lucide-react';
import clsx from 'clsx';

type Variant = 'info' | 'tip' | 'warning' | 'success';

const VARIANTS: Record<Variant, { bg: string; border: string; iconBg: string; text: string; Icon: React.ElementType }> = {
  info:    { bg: 'bg-sky-50',     border: 'border-sky-200',     iconBg: 'bg-sky-600',     text: 'text-sky-950',     Icon: Info },
  tip:     { bg: 'bg-indigo-50',  border: 'border-indigo-200',  iconBg: 'bg-indigo-600',  text: 'text-indigo-950',  Icon: Lightbulb },
  warning: { bg: 'bg-amber-50',   border: 'border-amber-200',   iconBg: 'bg-amber-600',   text: 'text-amber-950',   Icon: AlertTriangle },
  success: { bg: 'bg-emerald-50', border: 'border-emerald-200', iconBg: 'bg-emerald-600', text: 'text-emerald-950', Icon: CheckCircle2 },
};

export default function Callout({
  variant = 'info',
  title,
  children,
}: {
  variant?: Variant;
  title?: string;
  children: React.ReactNode;
}) {
  const v = VARIANTS[variant];
  const Icon = v.Icon;
  return (
    <aside className={clsx('my-6 border rounded-2xl p-5 flex gap-4', v.bg, v.border)}>
      <div className={clsx('w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0', v.iconBg)}>
        <Icon className="w-4 h-4 text-white" />
      </div>
      <div className={clsx('flex-1 min-w-0', v.text)}>
        {title && <p className="text-sm font-bold mb-1 font-sans">{title}</p>}
        <div className="text-sm leading-relaxed font-sans">{children}</div>
      </div>
    </aside>
  );
}
