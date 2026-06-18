import type { SVGProps } from 'react';

const base = (props: SVGProps<SVGSVGElement>) => ({
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  ...props,
});

export const BookIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>
);
export const PencilIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z" /></svg>
);
export const SigmaIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="M18 7V4H6l6 8-6 8h12v-3" /></svg>
);
export const SparkIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="M12 3v3m0 12v3M3 12h3m12 0h3M5.6 5.6l2.1 2.1m8.6 8.6l2.1 2.1m0-12.8l-2.1 2.1M7.7 16.3l-2.1 2.1" /><circle cx="12" cy="12" r="3.2" /></svg>
);
export const SearchIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>
);
export const KeyIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><circle cx="7.5" cy="15.5" r="4.5" /><path d="m10.5 12.5 8-8" /><path d="m16 6 2 2" /><path d="m19 3 2 2" /></svg>
);
export const ChevronRight = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="m9 18 6-6-6-6" /></svg>
);
export const ArrowRight = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
);
export const SendIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="m22 2-7 20-4-9-9-4 20-7z" /></svg>
);
export const MicIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><rect x="9" y="2" width="6" height="12" rx="3" /><path d="M5 10a7 7 0 0 0 14 0" /><path d="M12 19v3" /></svg>
);
export const StopIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><rect x="6" y="6" width="12" height="12" rx="2" /></svg>
);
export const LockIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base({ width: 26, height: 26, ...p })}><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
);
export const CheckIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="M20 6 9 17l-5-5" /></svg>
);
export const GraduationIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="M22 10 12 5 2 10l10 5 10-5z" /><path d="M6 12v5c0 1 2.5 2.5 6 2.5s6-1.5 6-2.5v-5" /></svg>
);
