import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, icon, iconRight, type, ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <label className="block text-xs font-semibold uppercase tracking-widest text-[var(--text-3)]">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-3)] pointer-events-none">
              {icon}
            </span>
          )}
          <input
            type={type}
            ref={ref}
            className={cn(
              'flex h-10 w-full rounded-xl border bg-[var(--bg-3)] px-4 py-2.5 text-sm ring-offset-background',
              'text-[var(--text-1)] placeholder:text-[var(--text-3)]',
              'border-[var(--border-c)] outline-none transition-all duration-200',
              'focus:border-[var(--brand)] focus:shadow-[0_0_0_3px_var(--brand-dim)]',
              'disabled:cursor-not-allowed disabled:opacity-50',
              icon && 'pl-10',
              iconRight && 'pr-10',
              error && 'border-destructive focus:border-destructive',
              className
            )}
            {...props}
          />
          {iconRight && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-3)]">
              {iconRight}
            </span>
          )}
        </div>
        {error && <p className="text-xs text-destructive">{error}</p>}
        {hint && !error && <p className="text-xs text-[var(--text-3)]">{hint}</p>}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
