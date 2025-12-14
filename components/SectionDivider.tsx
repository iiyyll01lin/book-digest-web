type SectionDividerProps = {
  className?: string;
  color?: 'white' | 'pink' | 'navy';
  thickness?: 'thin' | 'medium' | 'thick';
};

export default function SectionDivider({
  className = '',
  color = 'white',
  thickness = 'thin',
}: SectionDividerProps) {
  const colorClasses = {
    white: 'bg-white/30',
    pink: 'bg-brand-pink/50',
    navy: 'bg-brand-navy/30',
  };

  const thicknessClasses = {
    thin: 'h-px',
    medium: 'h-0.5',
    thick: 'h-1',
  };

  return (
    <div
      className={`w-full ${colorClasses[color]} ${thicknessClasses[thickness]} ${className}`}
      role="separator"
      aria-hidden="true"
    />
  );
}
