import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher(['/', '/products(.*)', '/about']);

// Presence-only debug logs (do NOT log secret values)
const _hasClerkPublishable = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);
const _hasClerkSecret = Boolean(process.env.CLERK_SECRET_KEY);
console.log(`[env] NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY present? ${_hasClerkPublishable}; CLERK_SECRET_KEY present? ${_hasClerkSecret}`);

export default clerkMiddleware(
  (auth, req) => {
    if (!isPublicRoute(req)) auth().protect();
  },
  {
    // Explicitly pass env vars to ensure middleware has access to the keys at runtime
    publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    secretKey: process.env.CLERK_SECRET_KEY,
  }
);

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};