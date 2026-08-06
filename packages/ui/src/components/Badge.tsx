import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';

export type BadgeVariant = 'dev' | 'compta' | 'infra' | 'neutral';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const base = 'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold';

/** Un badge par pôle (MODULE 4), plus un variant neutre (ex. disponibilité). */
const variantClasses: Record<BadgeVariant, string> = {
  dev: 'bg-pole-dev/15 text-pole-dev',
  compta: 'bg-pole-compta/15 text-pole-compta',
  infra: 'bg-pole-infra/15 text-pole-infra',
  neutral: 'border border-app-border bg-app-surface text-app-text-muted',
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'neutral', className, children, ...props }, ref) => {
    const classes = [base, variantClasses[variant], className].filter(Boolean).join(' ');
    return (
      <span ref={ref} data-variant={variant} className={classes} {...props}>
        {children}
      </span>
    );
  },
);

Badge.displayName = 'Badge';
