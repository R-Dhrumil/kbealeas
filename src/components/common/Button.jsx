import React from 'react';

export const Button = ({
  children,
  variant = 'primary', // primary, secondary, outline, ghost, vrinda, sangam, urban, coco
  size = 'md', // sm, md, lg
  className = '',
  onClick,
  type = 'button',
  disabled = false,
  icon: Icon = null
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]";

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-5 py-2.5 text-sm gap-2",
    lg: "px-7 py-3.5 text-base gap-2.5 font-semibold"
  };

  const variantStyles = {
    primary: "bg-kb-green text-white hover:bg-kb-green-dark focus:ring-kb-green shadow-md shadow-kb-green/20",
    secondary: "bg-kb-gold text-kb-charcoal hover:bg-yellow-500 focus:ring-kb-gold shadow-sm font-semibold",
    outline: "border-2 border-kb-green text-kb-green hover:bg-kb-green/5 focus:ring-kb-green",
    ghost: "text-kb-charcoal hover:bg-slate-100 focus:ring-slate-400",
    vrinda: "bg-[#2D5A27] text-white hover:bg-[#1B4318] focus:ring-[#2D5A27] shadow-sm",
    sangam: "bg-[#0277BD] text-white hover:bg-[#01579B] focus:ring-[#0277BD] shadow-sm",
    urban: "bg-[#4A2C2A] text-white hover:bg-[#2C1810] focus:ring-[#4A2C2A] shadow-sm",
    coco: "bg-[#C2185B] text-white hover:bg-[#880E4F] focus:ring-[#C2185B] shadow-sm"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {Icon && <Icon className={size === 'sm' ? "w-3.5 h-3.5" : size === 'lg' ? "w-5 h-5" : "w-4 h-4"} />}
      {children}
    </button>
  );
};
