// Pre-computed class mappings (avoid recreation on each render)
const COLOR_CLASSES = {
  white: 'bg-white/30',
  pink: 'bg-brand-pink/50',
  navy: 'bg-brand-navy/30',
} as const;

const THICKNESS_CLASSES = {
  thin: 'h-px',
  medium: 'h-0.5',
  thick: 'h-1',
} as const;

type SectionDividerProps = {
  className?: string;
  color?: keyof typeof COLOR_CLASSES;
  thickness?: keyof typeof THICKNESS_CLASSES;
};

export default function SectionDivider({
  className = '',
  color = 'white',
  thickness = 'thin',
}: SectionDividerProps) {
  return (
    <div
      className={`w-full ${COLOR_CLASSES[color]} ${THICKNESS_CLASSES[thickness]} ${className}`}
      role="separator"
      aria-hidden="true"
    />
  );
}
