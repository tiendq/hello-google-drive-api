'use client';

import { useState } from 'react';
import { signOut, useSession } from 'next-auth/react';

export default function Home() {
  const [files, setFiles] = useState([]);
  const session = useSession();
  console.log(session);

  async function handleListFiles() {
    const response = await fetch('https://www.googleapis.com/drive/v3/files', {
      headers: {
        Authorization: 'Bearer ' + session.data.access_token
      }
    });

    const json = await response.json();
    setFiles(json.files);
  }

  return (
    <main className="flex min-h-screen flex-col items-start justify-start p-4">
      <h1 className="mb-4 text-3xl">Hello Google Drive API</h1>
      {'authenticated' !== session.status && <p className="mb-4"><a href="/auth/signin" className="px-4 py-2 text-white bg-blue-500 rounded-md">Sign In</a></p>}
      {'authenticated' === session.status &&
        <>
          <p className="mb-4"><button type="button" className="px-4 py-2 text-white bg-gray-700 rounded-md" onClick={() => signOut()}>Sign Out</button></p>
          <p className="mb-4"><button type="button" className="px-4 py-2 text-white bg-gray-700 rounded-md" onClick={() => handleListFiles()}>List Files</button></p>
          <div className="w-1/2 mb-4">
            {files.map(file => <span key={file.id} className="block">{file.name}</span>)}
          </div>
        </>}
    </main>
  );
}
