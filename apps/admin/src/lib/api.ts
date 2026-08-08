import { getApiUrl } from './env';
import { getSessionToken } from './session';

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * Appelle apps/api serveur-à-serveur uniquement (jamais depuis le
 * navigateur, ADR 0011 décision 5) : `fetch` tourne dans un Server
 * Component/Action, jamais dans le bundle client.
 */
async function request<T>(path: string, init: RequestInit & { token?: string } = {}): Promise<T> {
  const { token, headers, ...rest } = init;
  const response = await fetch(`${getApiUrl()}${path}`, {
    ...rest,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    const body = await response.text();
    throw new ApiError(body || response.statusText, response.status);
  }

  if (response.status === 204) {
    return undefined as T;
  }
  return response.json() as Promise<T>;
}

export function loginRequest(email: string, password: string) {
  return request<{ accessToken: string }>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

/** Attache automatiquement le JWT de session (cookie httpOnly, session.ts). */
export async function authedFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = await getSessionToken();
  if (!token) {
    throw new ApiError('Session absente', 401);
  }
  return request<T>(path, { ...init, token });
}
