import React from 'react';
import { LucideIcon } from 'lucide-react';

interface IconInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: LucideIcon;
  rightElement?: React.ReactNode;
  containerClassName?: string;
  error?: string;
}

const IconInput: React.FC<IconInputProps> = ({
  label,
  icon: Icon,
  rightElement,
  containerClassName = '',
  className = '',
  error,
  ...props
}) => {
  return (
    <div className={containerClassName}>
      {label && (
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Icon size={18} />
          </div>
        )}
        <input
          className={`w-full ${Icon ? 'pl-10' : 'pl-4'} ${rightElement ? 'pr-32' : 'pr-4'} py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border focus:ring-2 focus:border-transparent outline-none transition-all text-slate-900 dark:text-white ${
            error
              ? 'border-red-300 focus:ring-red-500'
              : 'border-slate-200 dark:border-slate-700 focus:ring-primary-500'
          } ${className}`}
          {...props}
        />
        {rightElement && (
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
            {rightElement}
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default IconInput;