import { cookies } from 'next/headers';

/**
 * Cookie httpOnly : le JWT n'est jamais exposé au JavaScript client
 * (ADR 0011, décision 3). `secure` désactivé seulement hors production —
 * indispensable en dev local sans HTTPS.
 */
const SESSION_COOKIE = 'admin_session';

export async function getSessionToken(): Promise<string | undefined> {
  const store = await cookies();
  return store.get(SESSION_COOKIE)?.value;
}

export async function setSessionToken(token: string): Promise<void> {
  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60, // 1h — aligné sur signOptions.expiresIn côté apps/api
  });
}

export async function clearSessionToken(): Promise<void> {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}
