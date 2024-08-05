import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

export const config = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          access_type: 'offline',
          prompt: 'consent',
          response_type: 'code',
          scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/drive.metadata.readonly https://www.googleapis.com/auth/drive.file',
          include_granted_scopes: true
        }
      },
      account(account) { // DO NOT WORK
        // Ref: https://authjs.dev/reference/core/providers#account
        return {
          access_token: account.access_token,
          expires_at: account.expires_at,
          refresh_token: account.refresh_token,
          scope: account.scope,
          provider: account.provider,
          providerAccountId: account.providerAccountId
        };
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 90 * 24 * 60 * 60
  },
  pages: {
    error: '/auth/error',
    signIn: '/auth/signin',
    signOut: '/auth/signout'
  },
  callbacks: {
    async signIn({ account, profile }) {
      console.log('=== signIn:', account, profile);
      return profile.email_verified; // e.g. check profile.email against a black list here
    },
    async jwt({ token, account, profile }) {
      console.log('=== jwt:', token, account, profile);

      // Ref: https://authjs.dev/guides/refresh-token-rotation
      if (account) {
        token.access_token = account.access_token;
        token.refresh_token = account.refresh_token; // testing only
      }

      return token;
    },
    async session({ session, token }) {
      console.log('=== session:', session, token);

      session.access_token = token.access_token;
      session.refresh_token = token.refresh_token;

      return session;
    }
  },
  debug: 'development' === process.env.NODE_ENV
};

export const { auth, handlers, signIn, signOut } = NextAuth(config);
