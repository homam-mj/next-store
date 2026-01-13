import { auth } from '@clerk/nextjs/server';

export async function GET() {
  try {
    const { userId } = auth();
    const isAdmin = Boolean(userId && userId === process.env.ADMIN_USER_ID);
    return new Response(JSON.stringify({ isAdmin }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ isAdmin: false }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
