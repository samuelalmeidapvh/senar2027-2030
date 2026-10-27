import React from 'react';

interface ZebraSectionProps {
  id: string;
  variant: 'white' | 'tint' | 'gray';
  children: React.ReactNode;
  className?: string;
}

export const ZebraSection: React.FC<ZebraSectionProps> = ({
  id,
  variant,
  children,
  className = ''
}) => {
  const getBgClass = () => {
    switch (variant) {
      case 'white':
        return 'bg-white border-y border-slate-200/80';
      case 'tint':
        // Soft institutional green tint (very subtle, modern)
        return 'bg-[#f7faf8] border-y border-emerald-900/10';
      case 'gray':
      default:
        // Subtle cool neutral
        return 'bg-slate-50 border-y border-slate-200/70';
    }
  };

  return (
    <section 
      id={id} 
      className={`relative scroll-mt-16 py-16 sm:py-24 transition-colors ${getBgClass()} ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
};
