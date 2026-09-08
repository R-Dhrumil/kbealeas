import React from 'react';

export const Badge = ({ children, brand = 'kb', className = '' }) => {
  const brandStyles = {
    kb: "bg-kb-green/10 text-kb-green border-kb-green/20",
    vrinda: "bg-emerald-100 text-emerald-800 border-emerald-200",
    sangam: "bg-sky-100 text-sky-800 border-sky-200",
    "urban-roast": "bg-amber-100 text-amber-900 border-amber-200",
    "coco-joy": "bg-pink-100 text-pink-800 border-pink-200",
    gold: "bg-amber-100 text-amber-800 border-amber-300 font-semibold"
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${brandStyles[brand] || brandStyles.kb} ${className}`}>
      {children}
    </span>
  );
};
