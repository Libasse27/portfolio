'use client'; // error.tsx doit être un Client Component (contrainte Next.js App Router)

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <main>
      <h1>Une erreur est survenue</h1>
      <button onClick={reset}>Réessayer</button>
    </main>
  );
}
