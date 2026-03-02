import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors select-none',
  {
    variants: {
      variant: {
        default:   'border-[var(--border-c)] bg-[var(--surface-2)] text-[var(--text-2)]',
        brand:     'border-orange-300/60 bg-orange-50 text-orange-600 dark:bg-orange-500/15 dark:text-orange-400 dark:border-orange-500/30',
        success:   'border-green-300/60 bg-green-50 text-green-700 dark:bg-green-500/15 dark:text-green-400',
        danger:    'border-red-300/60 bg-red-50 text-red-600 dark:bg-red-500/15 dark:text-red-400',
        info:      'border-blue-300/60 bg-blue-50 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400',
        amber:     'border-amber-300/60 bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400',
        outline:   'border-[var(--border-c)] text-[var(--text-2)] bg-transparent',
        secondary: 'border-transparent bg-[var(--surface-2)] text-[var(--text-2)]',
      },
    },
    defaultVariants: { variant: 'default' },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
