import * as fs from 'node:fs';
import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import { auth } from '@/auth';

// https://drive.google.com/file/d/1pLccLtDMp5u_wJteAmtTW9cZRpDYmovb/view?usp=drive_link
// https://drive.google.com/uc?Id=1pLccLtDMp5u_wJteAmtTW9cZRpDYmovb&export=download
export async function POST(request) {
  const body = await request.json();
  const session = await auth();

  const client = new google.auth.OAuth2();
  client.setCredentials({ access_token: session.access_token });

  const drive = google.drive({ version: 'v3', auth: client });

  const metadata = {
    name: body.name,
    parents: ['1YfwCpaDMZTDU8DATokH79PP2ht3JGOl9']
  };

  const media = {
    mimeType: 'image/jpeg',
    body: fs.createReadStream('/Users/tiendq/Public/test.jpg')
  };

  try {
    const file = await drive.files.create({
      requestBody: metadata,
      media,
      fields: 'id,webViewLink,webContentLink'
    });

    console.log('File Id:', file.data.id);
    return NextResponse.json({ ...file.data }, { status: 201 });
  } catch (error) {
    // 401 - Invalid Credentials
    // 403 - Insufficient Permission
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
