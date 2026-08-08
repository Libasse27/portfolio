import Link from 'next/link';
import { authedFetch } from '@/lib/api';
import type { BlogPostRecord } from '@/lib/types';
import { deletePostAction, logoutAction } from './actions';

export default async function BlogListPage() {
  const posts = await authedFetch<BlogPostRecord[]>('/blog');

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Articles</h1>
        <div className="flex items-center gap-3">
          <Link
            href="/blog/nouveau"
            className="rounded-md bg-gray-900 px-3 py-1.5 text-sm font-semibold text-white"
          >
            Nouvel article
          </Link>
          <form action={logoutAction}>
            <button type="submit" className="text-sm text-gray-500 hover:text-gray-900">
              Déconnexion
            </button>
          </form>
        </div>
      </div>

      {posts.length === 0 ? (
        <p className="text-sm text-gray-500">Aucun article.</p>
      ) : (
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-gray-500">
              <th className="py-2">Titre</th>
              <th className="py-2">Thème</th>
              <th className="py-2">Date</th>
              <th className="py-2" />
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.slug} className="border-b border-gray-100">
                <td className="py-2">{post.titre}</td>
                <td className="py-2">{post.theme}</td>
                <td className="py-2">{post.datePublication}</td>
                <td className="py-2 text-right">
                  <Link
                    href={`/blog/${post.slug}/modifier`}
                    className="mr-3 text-gray-600 hover:text-gray-900"
                  >
                    Modifier
                  </Link>
                  <form action={deletePostAction.bind(null, post.slug)} className="inline">
                    <button type="submit" className="text-red-600 hover:text-red-800">
                      Supprimer
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
