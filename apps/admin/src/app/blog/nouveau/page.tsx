import { BlogPostForm } from '../BlogPostForm';
import { createPostAction } from '../actions';

export default function NewBlogPostPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-6 text-xl font-semibold">Nouvel article</h1>
      <BlogPostForm action={createPostAction} submitLabel="Publier" />
    </main>
  );
}
