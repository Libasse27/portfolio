import { ImageResponse } from 'next/og';
import { messages, routing, type AppLocale } from '@portfolio/i18n';
import { profil } from '@/lib/content';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/**
 * Image OG générée (MODULE 14), branding Teranga Slate en dur (palette
 * copiée de globals.css : Satori ne lit pas les variables CSS). Pas de
 * police personnalisée chargée à l'exécution — un fetch réseau au build
 * serait fragile (voir ADR 0004) ; police par défaut de Satori.
 */
export default async function OpengraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: requested } = await params;
  const locale: AppLocale = requested === 'en' ? 'en' : routing.defaultLocale;
  const { nomComplet, titre } = profil.identite;
  const { description } = messages[locale].Metadata;

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '80px',
        backgroundColor: '#12161a',
      }}
    >
      <div style={{ display: 'flex', width: 64, height: 6, backgroundColor: '#1496b8' }} />
      <div
        style={{ display: 'flex', fontSize: 64, fontWeight: 700, color: '#edf1f4', marginTop: 32 }}
      >
        {nomComplet}
      </div>
      <div style={{ display: 'flex', fontSize: 28, color: '#9facb6', marginTop: 16 }}>{titre}</div>
      <div style={{ display: 'flex', fontSize: 32, color: '#1496b8', marginTop: 40 }}>
        {description}
      </div>
    </div>,
    { ...size },
  );
}
