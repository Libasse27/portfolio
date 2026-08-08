'use server';

import { redirect } from 'next/navigation';
import { ApiError, loginRequest } from '@/lib/api';
import { setSessionToken } from '@/lib/session';

export interface LoginState {
  error?: string;
}

export async function loginAction(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get('email') ?? '');
  const password = String(formData.get('password') ?? '');

  try {
    const { accessToken } = await loginRequest(email, password);
    await setSessionToken(accessToken);
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) {
      return { error: 'Identifiants invalides.' };
    }
    return { error: "Impossible de contacter l'API. Réessayer plus tard." };
  }

  redirect('/blog');
}
