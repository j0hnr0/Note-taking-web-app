import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import { validateCredentials } from "@/lib/user-service";
import { PrismaAdapter } from "@auth/prisma-adapter";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          // Validate credentials using the user service
          const user = await validateCredentials(
            credentials.email,
            credentials.password
          );
          
          return user;
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      }
    })
  ],
  
  session: {
    strategy: "jwt", // Use JWT for credentials provider
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  
  callbacks: {
    async jwt({ token, user }) {
      // Initial sign in
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    
    async session({ session, token }) {
      // Send properties to the client
      if (session.user) {
        session.user.id = token.id;
        session.user.email = token.email;
      }
      return session;
    },
  },
  
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
  },
  
  // Enable debug in development
  debug: process.env.NODE_ENV === "development",
};

// For App Router
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };