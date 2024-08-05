import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import { auth } from '@/auth';

export async function POST(request) {
  const body = await request.json();
  const session = await auth();

  const client = new google.auth.OAuth2();
  client.setCredentials({ access_token: session.access_token });

  const drive = google.drive({ version: 'v3', auth: client });

  const metadata = {
    name: body.name,
    mimeType: 'application/vnd.google-apps.folder',
    parents: ['root']
  };

  try {
    const file = await drive.files.create({
      requestBody: metadata,
      fields: 'id'
    });

    console.log('Folder Id:', file.data.id);

    const shareable = {
      type: 'anyone',
      role: 'reader'
    };

    const permission = await drive.permissions.create({
      fileId: file.data.id,
      requestBody: shareable,
      fields: 'id'
    });

    console.log('Permission Id:', permission.data.id);
    return NextResponse.json({ id: file.data.id }, { status: 201 });
  } catch (error) {
    // 401 - Invalid Credentials
    // 403 - Insufficient Permission
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
