import NextAuth from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '../../../lib/prisma';

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: 'Development',
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Development User" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // For development, allow login with any email/password
        const username = credentials.username ? credentials.username : 'Development User';
        if (process.env.NODE_ENV === 'development') {
          const user = await prisma.user.findFirst({
            where: {
              name: username,
            },
          });
          if (user) {
            return user;
          } else {
            return await prisma.user.create({
              data: {
                name: username,
                email: 'devuser@example.com',
              },
            });
          }
        }
        return null;
      }
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async jwt({ token, user }) {
      // Add user info to the token if available
      if (user) {
        token.id = user.id;
        token.email = user.email;
        // Add any other user info you need
      }
      return token;
    },
    async session({ session, token  }) {
      // Populate session with user info from the token
      session.user.id = token .id;
      session.user.email = token .email;
      // Add any other user info you need
      return session;
    }
  },
  session: {
    strategy: "jwt" as const,
  },
};

export default NextAuth(authOptions);