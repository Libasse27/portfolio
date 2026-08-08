import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('./env', () => ({ getApiUrl: () => 'https://api.test' }));
vi.mock('./session', () => ({ getSessionToken: vi.fn() }));

import { ApiError, authedFetch, loginRequest } from './api';
import { getSessionToken } from './session';

describe('api', () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    vi.stubGlobal('fetch', fetchMock);
  });

  afterEach(() => {
    fetchMock.mockReset();
    vi.mocked(getSessionToken).mockReset();
  });

  it('loginRequest envoie les identifiants sans jeton de session', async () => {
    fetchMock.mockResolvedValue(
      new Response(JSON.stringify({ accessToken: 'jwt' }), { status: 200 }),
    );

    const result = await loginRequest('a@b.test', 'secret');

    expect(result).toEqual({ accessToken: 'jwt' });
    const call = fetchMock.mock.calls.at(0);
    if (!call) throw new Error('fetch non appelé');
    const [url, init] = call;
    expect(url).toBe('https://api.test/auth/login');
    expect(init.headers.Authorization).toBeUndefined();
  });

  it('authedFetch lève ApiError(401) si aucune session', async () => {
    vi.mocked(getSessionToken).mockResolvedValue(undefined);
    await expect(authedFetch('/blog')).rejects.toMatchObject({ status: 401 });
  });

  it('authedFetch attache le jeton en Authorization', async () => {
    vi.mocked(getSessionToken).mockResolvedValue('jwt-token');
    fetchMock.mockResolvedValue(new Response(JSON.stringify([]), { status: 200 }));

    await authedFetch('/blog');

    const call = fetchMock.mock.calls.at(0);
    if (!call) throw new Error('fetch non appelé');
    const [, init] = call;
    expect(init.headers.Authorization).toBe('Bearer jwt-token');
  });

  it('lève ApiError sur une réponse non-ok', async () => {
    vi.mocked(getSessionToken).mockResolvedValue('jwt-token');
    fetchMock.mockResolvedValue(new Response('Introuvable', { status: 404 }));

    await expect(authedFetch('/blog/inconnu')).rejects.toBeInstanceOf(ApiError);
  });
});
