import { describe, expect, it, vi } from 'vitest';

const store = {
  get: vi.fn(),
  set: vi.fn(),
  delete: vi.fn(),
};

vi.mock('next/headers', () => ({ cookies: async () => store }));

import { clearSessionToken, getSessionToken, setSessionToken } from './session';

describe('session', () => {
  it('getSessionToken lit le cookie admin_session', async () => {
    store.get.mockReturnValue({ value: 'jwt' });
    await expect(getSessionToken()).resolves.toBe('jwt');
    expect(store.get).toHaveBeenCalledWith('admin_session');
  });

  it('setSessionToken pose un cookie httpOnly', async () => {
    await setSessionToken('jwt');
    expect(store.set).toHaveBeenCalledWith(
      'admin_session',
      'jwt',
      expect.objectContaining({ httpOnly: true, sameSite: 'lax' }),
    );
  });

  it('clearSessionToken supprime le cookie', async () => {
    await clearSessionToken();
    expect(store.delete).toHaveBeenCalledWith('admin_session');
  });
});
