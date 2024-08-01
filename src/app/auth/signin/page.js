'use client';

import { signIn } from 'next-auth/react';

// Canceled signin:
// GET /api/auth/callback/google?error=access_denied 302 in 150ms
 // GET /auth/signin?error=OAuthCallbackError 200 in 59ms
export default function SignInPage() {
  return (
    <main className="flex min-h-screen flex-col items-start justify-start p-4">
      <h1 className="mb-4 text-3xl">Sign In</h1>
      <button type="button" className="px-4 py-2 bg-white border border-blue-500 rounded-md" onClick={() => signIn('google', { callbackUrl: '/dashboard' })}>
        <img src="https://authjs.dev/img/providers/google.svg" className="inline-block" height="24" width="24" loading="lazy" />
        <span className="pl-4">Sign in with Google</span>
      </button>
    </main>
  );
}
