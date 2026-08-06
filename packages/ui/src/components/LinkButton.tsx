import { forwardRef } from 'react';
import type { AnchorHTMLAttributes } from 'react';
import { buttonBaseClasses, buttonVariantClasses } from './Button';
import type { ButtonVariant } from './Button';

export interface LinkButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant;
}

/** Même apparence que Button, pour une navigation (ancre/route) plutôt qu'une action. */
export const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>(
  ({ variant = 'primary', className, children, ...props }, ref) => {
    const classes = [buttonBaseClasses, buttonVariantClasses[variant], className]
      .filter(Boolean)
      .join(' ');
    return (
      <a ref={ref} data-variant={variant} className={classes} {...props}>
        {children}
      </a>
    );
  },
);

LinkButton.displayName = 'LinkButton';
