'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Badge } from '@portfolio/ui';
import { Link } from '@portfolio/i18n';
import { formatDateSN } from '@portfolio/utils';
import type { BlogPost } from '@/lib/blog';

const THEMES = ['dev', 'compta', 'infra'] as const;
type ThemeFilter = 'all' | (typeof THEMES)[number];

export function BlogFilter({ posts }: { posts: BlogPost[] }) {
  const t = useTranslations('Blog');
  const [filter, setFilter] = useState<ThemeFilter>('all');

  const filtered = filter === 'all' ? posts : posts.filter((post) => post.theme === filter);

  const filterLabel: Record<ThemeFilter, string> = {
    all: t('filterAll'),
    dev: t('filterDev'),
    compta: t('filterCompta'),
    infra: t('filterInfra'),
  };

  return (
    <div>
      <div role="group" aria-label={t('heading')} className="flex flex-wrap gap-2">
        {(['all', ...THEMES] as const).map((theme) => (
          <button
            key={theme}
            type="button"
            onClick={() => setFilter(theme)}
            aria-pressed={filter === theme}
            className={[
              'rounded-full border px-4 py-1.5 text-sm font-medium transition-colors',
              filter === theme
                ? 'border-primary-fill bg-primary-fill text-white'
                : 'border-app-border text-app-text-muted hover:border-primary hover:text-app-text',
            ].join(' ')}
          >
            {filterLabel[theme]}
          </button>
        ))}
      </div>

      <div className="mt-8">
        {filtered.length === 0 ? (
          <p className="text-app-text-muted italic">{t('emptyState')}</p>
        ) : (
          <ul className="grid gap-6 sm:grid-cols-2">
            {filtered.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="border-app-border hover:border-primary block h-full rounded-lg border p-5 transition-colors"
                >
                  <Badge variant={post.theme}>{filterLabel[post.theme]}</Badge>
                  <h3 className="font-heading text-app-text mt-3 text-lg font-semibold">
                    {post.titre}
                  </h3>
                  <p className="text-app-text-muted mt-2 text-sm">{post.extrait}</p>
                  <p className="text-app-text-muted mt-4 text-xs">
                    {formatDateSN(post.datePublication)} ·{' '}
                    {t('readingTime', { minutes: post.readingTimeMinutes })}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
