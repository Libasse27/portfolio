import { Link } from '@portfolio/i18n';
import type { BlogPost } from '@/lib/blog';

export function RelatedPosts({ posts, heading }: { posts: BlogPost[]; heading: string }) {
  if (posts.length === 0) return null;

  return (
    <section
      aria-labelledby="related-posts-heading"
      className="border-app-border mt-16 border-t pt-10"
    >
      <h2 id="related-posts-heading" className="font-heading text-app-text text-xl font-bold">
        {heading}
      </h2>
      <ul className="mt-6 grid gap-4 sm:grid-cols-3">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="border-app-border hover:border-primary block h-full rounded-lg border p-4 text-sm font-medium"
            >
              {post.titre}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
