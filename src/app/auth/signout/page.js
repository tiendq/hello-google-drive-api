import { signOut } from '@/auth';

export default async function SignOutPage() {
  await signOut();

  return (
    <main className="flex min-h-screen flex-col items-start justify-start p-4">
      <h1 className="mb-4 text-3xl">Sign Out</h1>
    </main>
  );
}
