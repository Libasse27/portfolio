import { forwardRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

// Exportés pour être partagés avec LinkButton (même apparence, élément <a>).
export const buttonBaseClasses =
  'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-semibold ' +
  'transition-colors duration-150 focus-visible:outline focus-visible:outline-2 ' +
  'focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50 ' +
  'disabled:pointer-events-none';

/**
 * Couleur primaire = accent du pôle Dev (MODULE 4 : le développement est
 * mis en avant en premier). Le variant `primary` utilise `bg-primary-fill`
 * (pas `bg-primary`) : `--color-primary` seul n'offre que 3.45:1 avec du
 * texte blanc en thème sombre, sous le seuil WCAG AA (4.5:1) — ADR 0005.
 */
export const buttonVariantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-primary-fill text-white hover:opacity-90',
  secondary: 'border border-app-border bg-app-surface text-app-text hover:border-primary',
  ghost: 'bg-transparent text-primary hover:bg-app-surface',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', className, children, ...props }, ref) => {
    const classes = [buttonBaseClasses, buttonVariantClasses[variant], className]
      .filter(Boolean)
      .join(' ');
    return (
      <button ref={ref} data-variant={variant} className={classes} {...props}>
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
