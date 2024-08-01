import { auth } from '@/auth';

export default async function Dashboard() {
  const session = await auth();

  return (
    <main className="flex min-h-screen flex-col items-start justify-start p-4">
      <h1 className="mb-4 text-3xl">Dashboard</h1>
      {!session && <div>Unauthenticated</div>}
      {session && session.user && <img src={session.user.image} className="inline-block" width="64" height="64" />}
    </main>
  );
}
