import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

/**
 * Icône iOS (ajout à l'écran d'accueil), même patron que
 * `[locale]/opengraph-image.tsx` (ImageResponse, palette Teranga Slate en
 * dur — Satori ne lit pas les variables CSS). Fond opaque obligatoire : iOS
 * ignore la transparence et peint du noir derrière une icône partiellement
 * transparente.
 */
export default function AppleIcon() {
  const R = 100; // cercle de base pour cette résolution 180×180
  const circle = (cx: number, cy: number, color: string) => (
    <div
      style={{
        position: 'absolute',
        left: cx - R,
        top: cy - R,
        width: R * 2,
        height: R * 2,
        borderRadius: '50%',
        backgroundColor: color,
        opacity: 0.68,
      }}
    />
  );

  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', display: 'flex', backgroundColor: '#12161a' }}>
      {circle(94, 54, '#1496b8')}
      {circle(65, 109, '#d48a1e')}
      {circle(123, 109, '#7b7ff5')}
    </div>,
    { ...size },
  );
}
