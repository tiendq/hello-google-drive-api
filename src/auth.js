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
          include_granted_scopes: true,
          prompt: 'consent',
          response_type: 'code'
        }
      }
    })
  ],
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
      return token;
    },
    async session({ session, token }) {
      console.log('=== session:', session, token);

      session.user.id = token.id;
      return session;
    }
  },
  debug: 'development' === process.env.NODE_ENV
};

export const { auth, handlers, signIn, signOut } = NextAuth(config);
