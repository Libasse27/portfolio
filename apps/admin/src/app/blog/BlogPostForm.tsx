'use client';

import { useActionState } from 'react';
import type { BlogFormState } from './actions';

interface BlogPostFormProps {
  action: (prevState: BlogFormState, formData: FormData) => Promise<BlogFormState>;
  submitLabel: string;
  defaultValues?: {
    titre?: string;
    extrait?: string;
    corps?: string;
    datePublication?: string;
    theme?: string;
    tags?: string[];
  };
}

const initialState: BlogFormState = {};

export function BlogPostForm({ action, submitLabel, defaultValues }: BlogPostFormProps) {
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="max-w-2xl space-y-4">
      <div className="space-y-1">
        <label htmlFor="titre" className="block text-sm font-medium">
          Titre
        </label>
        <input
          id="titre"
          name="titre"
          required
          defaultValue={defaultValues?.titre}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="extrait" className="block text-sm font-medium">
          Extrait
        </label>
        <textarea
          id="extrait"
          name="extrait"
          required
          rows={2}
          defaultValue={defaultValues?.extrait}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="corps" className="block text-sm font-medium">
          Corps (Markdown/MDX)
        </label>
        <textarea
          id="corps"
          name="corps"
          required
          rows={12}
          defaultValue={defaultValues?.corps}
          className="w-full rounded-md border border-gray-300 px-3 py-2 font-mono text-sm"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label htmlFor="datePublication" className="block text-sm font-medium">
            Date de publication
          </label>
          <input
            id="datePublication"
            name="datePublication"
            type="date"
            required
            defaultValue={defaultValues?.datePublication}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="theme" className="block text-sm font-medium">
            Pôle
          </label>
          <select
            id="theme"
            name="theme"
            required
            defaultValue={defaultValues?.theme}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          >
            <option value="dev">Développement</option>
            <option value="compta">Comptabilité</option>
            <option value="infra">Infrastructure</option>
          </select>
        </div>
      </div>

      <div className="space-y-1">
        <label htmlFor="tags" className="block text-sm font-medium">
          Tags (séparés par des virgules)
        </label>
        <input
          id="tags"
          name="tags"
          defaultValue={defaultValues?.tags?.join(', ')}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
        />
      </div>

      {state.error && (
        <p role="alert" className="text-sm text-red-600">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
      >
        {pending ? 'Enregistrement…' : submitLabel}
      </button>
    </form>
  );
}
