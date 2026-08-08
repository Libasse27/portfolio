import type { BlogHeading } from '@/lib/blog';

/**
 * Sommaire "flottant" = `sticky` en CSS pur, sans mise en évidence de
 * section active au scroll (ADR 0009, décision 6 : pas de JS supplémentaire
 * pour une fonctionnalité non explicitement demandée au-delà de "flottant").
 */
export function TableOfContents({
  headings,
  heading,
}: {
  headings: BlogHeading[];
  heading: string;
}) {
  if (headings.length === 0) return null;

  return (
    <nav aria-label={heading} className="sticky top-20 hidden self-start lg:block">
      <p className="text-app-text-muted text-xs font-semibold uppercase tracking-wide">{heading}</p>
      <ul className="border-app-border mt-3 space-y-2 border-l pl-4 text-sm">
        {headings.map((item) => (
          <li key={item.id} className={item.depth === 3 ? 'pl-3' : undefined}>
            <a href={`#${item.id}`} className="text-app-text-muted hover:text-app-text">
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
