import { authedFetch } from '@/lib/api';
import type { BlogPostRecord } from '@/lib/types';
import { BlogPostForm } from '../../BlogPostForm';
import { updatePostAction } from '../../actions';

export default async function EditBlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await authedFetch<BlogPostRecord>(`/blog/${slug}`);
  const boundAction = updatePostAction.bind(null, slug);

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-6 text-xl font-semibold">Modifier « {post.titre} »</h1>
      <BlogPostForm action={boundAction} submitLabel="Enregistrer" defaultValues={post} />
    </main>
  );
}
