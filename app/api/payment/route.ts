import Stripe from 'stripe';
import { type NextRequest } from 'next/server';
import db from '@/utils/db';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
  throw new Error('Missing STRIPE_SECRET_KEY. Add your Stripe secret key to .env.local');
}
const stripe = new Stripe(stripeSecretKey);

export const POST = async (req: NextRequest) => {
  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/6fccf632-d8cd-4ca1-ba9f-13c486cf049d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/api/payment/route.ts:9',message:'Payment API POST called',data:{hasStripeKey:Boolean(stripeSecretKey)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
  // #endregion
  
  const requestHeaders = new Headers(req.headers);
  const origin = requestHeaders.get('origin');

  const { orderId, cartId } = await req.json();

  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/6fccf632-d8cd-4ca1-ba9f-13c486cf049d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/api/payment/route.ts:12',message:'Payment API request parsed',data:{orderId,cartId,origin},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
  // #endregion

  const order = await db.order.findUnique({
    where: {
      id: orderId,
    },
  });
  const cart = await db.cart.findUnique({
    where: {
      id: cartId,
    },
    include: {
      cartItems: {
        include: {
          product: true,
        },
      },
    },
  });
  
  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/6fccf632-d8cd-4ca1-ba9f-13c486cf049d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/api/payment/route.ts:35',message:'Order and cart lookup completed',data:{orderFound:Boolean(order),cartFound:Boolean(cart),cartItemsCount:cart?.cartItems?.length||0},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
  // #endregion
  
  if (!order || !cart) {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/6fccf632-d8cd-4ca1-ba9f-13c486cf049d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/api/payment/route.ts:38',message:'Order or cart not found - returning 404',data:{orderFound:Boolean(order),cartFound:Boolean(cart)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
    // #endregion
    return Response.json(null, {
      status: 404,
      statusText: 'Not Found',
    });
  }
  
  // line items
  const line_items = cart.cartItems.map((cartItem) => {
    return {
      quantity: cartItem.amount,
      price_data: {
        currency: 'usd',
        product_data: {
          name: cartItem.product.name,
          images: [cartItem.product.image],
        },
        unit_amount: cartItem.product.price * 100, // price in cents
      },
    };
  });

  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/6fccf632-d8cd-4ca1-ba9f-13c486cf049d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/api/payment/route.ts:56',message:'Line items created',data:{lineItemsCount:line_items.length,isEmpty:line_items.length===0},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
  // #endregion

  // Validate that cart has items
  if (line_items.length === 0) {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/6fccf632-d8cd-4ca1-ba9f-13c486cf049d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/api/payment/route.ts:74',message:'Empty cart items - returning error',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
    // #endregion
    return Response.json(
      { error: 'Cart is empty. Please add items to your cart before checkout.' },
      {
        status: 400,
        statusText: 'Bad Request',
      }
    );
  }

  try {
    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      metadata: { orderId, cartId },
      line_items: line_items,
      mode: 'payment',
      return_url: `${origin}/api/confirm?session_id={CHECKOUT_SESSION_ID}`,
    });
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/6fccf632-d8cd-4ca1-ba9f-13c486cf049d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/api/payment/route.ts:66',message:'Stripe session created successfully',data:{hasClientSecret:Boolean(session.client_secret)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
    // #endregion
    return Response.json({ clientSecret: session.client_secret });
  } catch (error: any) {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/6fccf632-d8cd-4ca1-ba9f-13c486cf049d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/api/payment/route.ts:70',message:'Stripe API error',data:{errorMessage:error?.message,errorType:error?.type,errorCode:error?.code},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
    // #endregion
    console.log(error);
    return Response.json(null, {
      status: 500,
      statusText: 'Internal Server Error',
    });
  }
};
