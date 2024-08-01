import { signIn } from '@/auth';

export default function SignIn() {
  return (
    <main className="flex min-h-screen flex-col items-start justify-start p-4">
      <h1 className="mb-4 text-3xl">Sign In</h1>
      <form action={async () => { 'use server'; await signIn('google', { redirectTo: '/dashboard' })}}>
        <button type="submit" className="px-4 py-2 bg-white border border-blue-500 rounded-md">
          <img src="https://authjs.dev/img/providers/google.svg" className="inline-block" height="24" width="24" loading="lazy" />
          <span className="pl-4">Sign in with Google</span>
        </button>
      </form>
    </main>
  );
}
