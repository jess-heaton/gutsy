import clsx from 'clsx';

export default function HeroImage({
  src,
  alt,
  priority = false,
  className,
  aspect = 'aspect-[16/9]',
}: {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  aspect?: string;
}) {
  return (
    <div className={clsx('relative overflow-hidden bg-gradient-to-br from-brand-900 via-brand-800 to-brand-700', aspect, className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Subtle dark gradient for text contrast when overlaid */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" aria-hidden />
    </div>
  );
}
