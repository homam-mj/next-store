import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
import { redirect } from 'next/navigation';

import { type NextRequest } from 'next/server';
import db from '@/utils/db';

export const GET = async (req: NextRequest) => {
  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/6fccf632-d8cd-4ca1-ba9f-13c486cf049d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/api/confirm/route.ts:8',message:'Confirm API GET called',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
  // #endregion
  
  const { searchParams } = new URL(req.url);
  const session_id = searchParams.get('session_id') as string;

  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/6fccf632-d8cd-4ca1-ba9f-13c486cf049d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/api/confirm/route.ts:13',message:'Confirm API - session_id extracted',data:{hasSessionId:Boolean(session_id),sessionId:session_id?.substring(0,20)+'...'},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
  // #endregion

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);

    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/6fccf632-d8cd-4ca1-ba9f-13c486cf049d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/api/confirm/route.ts:19',message:'Stripe session retrieved',data:{sessionStatus:session.status,hasOrderId:Boolean(session.metadata?.orderId),hasCartId:Boolean(session.metadata?.cartId)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
    // #endregion

    const orderId = session.metadata?.orderId;
    const cartId = session.metadata?.cartId;

    if (!orderId || !cartId) {
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/6fccf632-d8cd-4ca1-ba9f-13c486cf049d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/api/confirm/route.ts:25',message:'Missing orderId or cartId in session metadata',data:{hasOrderId:Boolean(orderId),hasCartId:Boolean(cartId)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
      // #endregion
      redirect('/orders');
      return;
    }

    if (session.status === 'complete') {
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/6fccf632-d8cd-4ca1-ba9f-13c486cf049d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/api/confirm/route.ts:33',message:'Payment complete - updating order and deleting cart',data:{orderId,cartId},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
      // #endregion
      
      await db.order.update({
        where: {
          id: orderId,
        },
        data: {
          isPaid: true,
        },
      });
      
      await db.cart.delete({
        where: {
          id: cartId,
        },
      });
    } else {
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/6fccf632-d8cd-4ca1-ba9f-13c486cf049d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/api/confirm/route.ts:50',message:'Payment not complete - keeping cart',data:{sessionStatus:session.status},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
      // #endregion
    }
  } catch (error: any) {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/6fccf632-d8cd-4ca1-ba9f-13c486cf049d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/api/confirm/route.ts:55',message:'Confirm API error',data:{errorMessage:error?.message,errorType:error?.type},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
    // #endregion
    console.log(error);
    redirect('/orders');
    return;
  }
  redirect('/orders');
};
