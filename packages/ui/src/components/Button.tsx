import { forwardRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

/** Primitive structurelle : le style visuel (couleurs, typo) arrive en Phase 1 — Design System. */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', className, children, ...props }, ref) => {
    return (
      <button ref={ref} data-variant={variant} className={className} {...props}>
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
