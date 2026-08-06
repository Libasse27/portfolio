import { Hero } from '@/components/sections/Hero';
import { TripleExpertise } from '@/components/sections/TripleExpertise';
import { About } from '@/components/sections/About';
import { Experience } from '@/components/sections/Experience';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/sections/Footer';

/**
 * Sections dans l'ordre du MODULE 13 (ADR 0003). Projets, Services,
 * Compétences, Formation, FAQ restent absents tant que leur contenu n'est
 * pas débloqué — voir docs/07-Content/README.md.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <TripleExpertise />
      <About />
      <Experience />
      <Contact />
      <Footer />
    </>
  );
}
