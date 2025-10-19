import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    children: React.ReactNode;
}

const Select: React.FC<SelectProps> = ({ className, children, ...props }) => {
  return (
    <div className="relative w-full">
        <select
          className={`w-full bg-slate-700 text-white placeholder-slate-400 border border-slate-600 rounded-md pl-3 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition appearance-none ${className}`}
          {...props}
        >
            {children}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
        </div>
    </div>
  );
};

export default Select;
