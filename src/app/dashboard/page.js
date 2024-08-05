import { google } from 'googleapis';
import { auth } from '@/auth';

async function getFiles(accessToken, refreshToken) {
  const client = google.auth.fromJSON({
    type: 'authorized_user',
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    refresh_token: refreshToken
  });
  const drive = google.drive({version: 'v3', auth: client});
  const response = await drive.files.list({
    pageSize: 10,
    fields: 'nextPageToken, files(id, name)'
  });

  return response.data.files;
}

async function getFiles2(accessToken, refreshToken) {
  // Ref: https://github.com/googleapis/google-auth-library-nodejs?tab=readme-ov-file
  const client = new google.auth.OAuth2();
  client.setCredentials({ access_token: accessToken });

  const drive = google.drive({version: 'v3', auth: client});
  const response = await drive.files.list({
    pageSize: 25,
    fields: 'nextPageToken, files(id, name)'
  });

  return response.data.files;
}

export default async function Dashboard() {
  const session = await auth();

  if (!session)
    return <div>Unauthenticated</div>;

  const files = await getFiles2(session.access_token, session.refresh_token);

  return (
    <main className="flex min-h-screen flex-col items-start justify-start p-4">
      <h1 className="mb-4 text-3xl">Dashboard</h1>
      <div>
        <img src={session.user.image} className="inline-block rounded-full" width="64" height="64" />
        <span className="pl-4">{session.user.name}</span>
      </div>
      <div className="w-1/2">
        <code className="block mt-4 text-wrap break-words">{JSON.stringify(session)}</code>
      </div>
      <div>
        {files.map(file => <span key={file.id} className="block">{file.name}</span>)}
      </div>
    </main>
  );
}
