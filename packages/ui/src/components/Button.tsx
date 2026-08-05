import { forwardRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const base =
  'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-semibold ' +
  'transition-colors duration-150 focus-visible:outline focus-visible:outline-2 ' +
  'focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50 ' +
  'disabled:pointer-events-none';

/** Couleur primaire = accent du pôle Dev (MODULE 4 : le développement est mis en avant en premier). */
const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-white hover:opacity-90',
  secondary: 'border border-app-border bg-app-surface text-app-text hover:border-primary',
  ghost: 'bg-transparent text-primary hover:bg-app-surface',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', className, children, ...props }, ref) => {
    const classes = [base, variantClasses[variant], className].filter(Boolean).join(' ');
    return (
      <button ref={ref} data-variant={variant} className={classes} {...props}>
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
