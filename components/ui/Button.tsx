
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'operator' | 'function';
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className, ...props }) => {
  const baseClasses = "px-4 py-2 rounded-md font-semibold text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 disabled:opacity-50";

  const variantClasses = {
    primary: "bg-cyan-600 hover:bg-cyan-500 focus:ring-cyan-500",
    secondary: "bg-slate-600 hover:bg-slate-500 focus:ring-slate-500",
    operator: "bg-orange-600 hover:bg-orange-500 focus:ring-orange-500 text-2xl",
    function: "bg-slate-700 hover:bg-slate-600 focus:ring-slate-600",
  };
  
  return (
    <button className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
