'use client';

import { useState } from 'react';
import { signOut, useSession } from 'next-auth/react';

export default function Home() {
  const [files, setFiles] = useState([]);
  const [fileUrl, setFileUrl] = useState('');
  const session = useSession();
  console.log(session);

  // curl -H "Authorization: Bearer access_token" https://www.googleapis.com/drive/v2/files
  async function handleListFiles() {
    const response = await fetch('https://www.googleapis.com/drive/v3/files', {
      headers: {
        Authorization: 'Bearer ' + session.data.access_token
      }
    });

    const json = await response.json();
    setFiles(json.files);
  }

  async function handleCreateFolder() {
    const response = await fetch('/api/drive/folder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: 'Test 3' })
    });

    const json = await response.json();
    console.log(json);
  }

  async function handleCreateFile() {
    const response = await fetch('/api/drive/file', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: 'Test 6.jpg' })
    });

    const json = await response.json();
    console.log(json);

    // Ref: https://github.com/orgs/community/discussions/86986
    // Issue: https://issuetracker.google.com/issues/319531488#comment175
    // https://justin.poehnelt.com/posts/google-drive-embed-images-403/
    if (json.webContentLink)
      setFileUrl(`https://drive.google.com/thumbnail?id=${json.id}&sz=w1024`);
  }

  return (
    <main className="flex min-h-screen flex-col items-start justify-start p-4">
      <h1 className="mb-4 text-3xl">Hello Google Drive API</h1>
      {'authenticated' !== session.status && <p className="mb-4"><a href="/auth/signin" className="px-4 py-2 text-white bg-blue-500 rounded-md">Sign In</a></p>}
      {'authenticated' === session.status &&
        <>
          <p className="mb-4"><button type="button" className="px-4 py-2 text-white bg-gray-700 rounded-md" onClick={() => signOut()}>Sign Out</button></p>
          <p className="mb-4"><button type="button" className="px-4 py-2 text-white bg-gray-700 rounded-md" onClick={() => handleListFiles()}>List Files</button></p>
          <p className="mb-4"><button type="button" className="px-4 py-2 text-white bg-gray-700 rounded-md" onClick={() => handleCreateFolder()}>Create Folder</button></p>
          <p className="mb-4"><button type="button" className="px-4 py-2 text-white bg-gray-700 rounded-md" onClick={() => handleCreateFile()}>Create File</button></p>
          <div className="w-1/2 mb-4">
            {files.map(file => <span key={file.id} className="block">{file.name}</span>)}
          </div>
          {fileUrl && <img src={fileUrl} />}
        </>}
    </main>
  );
}
