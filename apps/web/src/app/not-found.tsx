import Link from 'next/link';

export default function NotFound() {
  return (
    <main>
      <h1>Page introuvable</h1>
      <Link href="/">Retour à l&apos;accueil</Link>
    </main>
  );
}
