import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google"; // Add this import
import { createGoogleUser, validateCredentials } from "@/app/lib/user-service";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
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
      },
    }),
    // Add Google Provider here
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  session: {
    strategy: "jwt", // Use JWT for both providers
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // Optional: Handle Google sign-in to save user to your database
      if (account?.provider === "google") {
        // You might want to save the Google user to your database here
        const dbUser = await createGoogleUser({
          email: user.email,
          googleId: account.providerAccountId,
        });

        if (!dbUser) {
          return false;
        }

        user.id = dbUser.id;

        return true;
      }
      return true; // Allow sign in for other providers
    },

    async jwt({ token, user, account, profile }) {
      // Initial sign in
      if (user) {
        token.id = user.id;
        token.email = user.email;

        // Store provider info
        if (account) {
          token.provider = account.provider;
          // For Google users, you might not have user.id from your DB
          // You can use the Google account ID or email as identifier
          if (account.provider === "google") {
            token.id = user.id || account.providerAccountId;
            token.name = user.name;
            token.image = user.image;
          }
        }
      }
      return token;
    },

    async session({ session, token }) {
      // Send properties to the client
      if (session.user) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.provider = token.provider;

        // Include additional info for Google users
        if (token.provider === "google") {
          session.user.name = token.name;
          session.user.image = token.image;
        }
      }
      return session;
    },
  },

  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
  },

  // Enable debug in development
  debug: process.env.NODE_ENV === "development",
};

// For App Router
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
