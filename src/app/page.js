'use client';

import { signOut } from 'next-auth/react';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-start justify-start p-4">
      <h1 className="mb-4 text-3xl">Hello Google Drive API</h1>
      <p className="mb-4"><a href="./login" className="px-4 py-2 text-white bg-blue-500 rounded-md">Sign In</a></p>
      <p className="mb-4"><button type="button" className="px-4 py-2 text-white bg-gray-700 rounded-md" onClick={() => signOut()}>Sign Out</button></p>
    </main>
  );
}
