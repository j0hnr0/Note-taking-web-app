// middleware.js (place at the root of your project)
import { withAuth } from "next-auth/middleware";

// Simplified middleware that only checks if user is authenticated
export default withAuth({
  // Users must have a valid session to access protected routes
  callbacks: {
    authorized: ({ token }) => !!token,
  },
});

// Configure which paths require authentication
export const config = {
  matcher: [
    // Protect these paths
    "/all-notes/:path*",
    "/archived-notes/:path*",
    "/tags/:path*",
    "/settings/:path*",
  ],
};
