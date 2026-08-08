'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { createBlogPostSchema, updateBlogPostSchema } from '@portfolio/validations';
import { authedFetch } from '@/lib/api';
import { clearSessionToken } from '@/lib/session';

export interface BlogFormState {
  error?: string;
}

function parseTags(raw: FormDataEntryValue | null): string[] {
  return String(raw ?? '')
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean);
}

export async function createPostAction(
  _prevState: BlogFormState,
  formData: FormData,
): Promise<BlogFormState> {
  const input = createBlogPostSchema.safeParse({
    titre: formData.get('titre'),
    extrait: formData.get('extrait'),
    corps: formData.get('corps'),
    datePublication: formData.get('datePublication'),
    theme: formData.get('theme'),
    tags: parseTags(formData.get('tags')),
  });

  if (!input.success) {
    return {
      error: 'Formulaire invalide : ' + input.error.issues.map((i) => i.message).join(', '),
    };
  }

  await authedFetch('/blog', { method: 'POST', body: JSON.stringify(input.data) });
  revalidatePath('/blog');
  redirect('/blog');
}

export async function updatePostAction(
  slug: string,
  _prevState: BlogFormState,
  formData: FormData,
): Promise<BlogFormState> {
  const input = updateBlogPostSchema.safeParse({
    titre: formData.get('titre'),
    extrait: formData.get('extrait'),
    corps: formData.get('corps'),
    datePublication: formData.get('datePublication'),
    theme: formData.get('theme'),
    tags: parseTags(formData.get('tags')),
  });

  if (!input.success) {
    return {
      error: 'Formulaire invalide : ' + input.error.issues.map((i) => i.message).join(', '),
    };
  }

  await authedFetch(`/blog/${slug}`, { method: 'PATCH', body: JSON.stringify(input.data) });
  revalidatePath('/blog');
  redirect('/blog');
}

export async function deletePostAction(slug: string): Promise<void> {
  await authedFetch(`/blog/${slug}`, { method: 'DELETE' });
  revalidatePath('/blog');
}

export async function logoutAction(): Promise<void> {
  await clearSessionToken();
  redirect('/login');
}
