import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

export const config = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  callbacks: {
    async signIn({ account, profile }) {
      return profile.email_verified;
    }
  }
};

export const { auth, handlers, signIn, signOut } = NextAuth(config);
