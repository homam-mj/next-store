'use client';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useTheme } from 'next-themes';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from '@stripe/react-stripe-js';
import CheckoutProgressBar from '@/components/checkout/CheckoutProgressBar';

const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise = stripePublishableKey ? loadStripe(stripePublishableKey) : null;

function CheckoutPage() {
  const searchParams = useSearchParams();

  const orderId = searchParams.get('orderId');
  const cartId = searchParams.get('cartId');

  // Show error if orderId or cartId is missing
  if (!orderId || !cartId) {
    return (
      <div className='flex flex-col items-center justify-center min-h-[400px] p-8'>
        <h2 className='text-2xl font-bold mb-4'>Checkout Error</h2>
        <p className='text-muted-foreground mb-4'>
          Missing order or cart information. Please try adding items to your cart again.
        </p>
        <a href='/cart' className='text-primary hover:underline'>
          Return to Cart
        </a>
      </div>
    );
  }

  // Show error if Stripe key is missing
  if (!stripePublishableKey || !stripePromise) {
    return (
      <div className='flex flex-col items-center justify-center min-h-[400px] p-8'>
        <h2 className='text-2xl font-bold mb-4'>Stripe Configuration Error</h2>
        <p className='text-muted-foreground mb-4'>
          Stripe is not configured. Please add your Stripe keys to your environment variables.
        </p>
        <div className='bg-muted p-4 rounded-md text-sm'>
          <p className='font-semibold mb-2'>Required environment variables:</p>
          <ul className='list-disc list-inside space-y-1'>
            <li><code>NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY</code> - Your Stripe publishable key</li>
            <li><code>STRIPE_SECRET_KEY</code> - Your Stripe secret key (server-side only)</li>
          </ul>
          <p className='mt-4 text-xs text-muted-foreground'>
            Add these to your <code>.env.local</code> file and restart your dev server.
          </p>
        </div>
      </div>
    );
  }

  // #region agent log
  if (typeof window !== 'undefined') { fetch('http://127.0.0.1:7242/ingest/6fccf632-d8cd-4ca1-ba9f-13c486cf049d', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ location: 'app/checkout/page.tsx:18', message: 'CheckoutPage rendering', data: { hasOrderId: Boolean(orderId), hasCartId: Boolean(cartId), hasStripeKey: Boolean(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) }, timestamp: Date.now(), sessionId: 'debug-session', runId: 'run1', hypothesisId: 'C' }) }).catch(() => { }); }
  // #endregion

  const fetchClientSecret = useCallback(async () => {
    // #region agent log
    if (typeof window !== 'undefined') { fetch('http://127.0.0.1:7242/ingest/6fccf632-d8cd-4ca1-ba9f-13c486cf049d', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ location: 'app/checkout/page.tsx:46', message: 'fetchClientSecret called', data: { orderId, cartId }, timestamp: Date.now(), sessionId: 'debug-session', runId: 'run1', hypothesisId: 'C' }) }).catch(() => { }); }
    // #endregion

    try {
      const response = await axios.post('/api/payment', {
        orderId,
        cartId,
      });
      // #region agent log
      if (typeof window !== 'undefined') { fetch('http://127.0.0.1:7242/ingest/6fccf632-d8cd-4ca1-ba9f-13c486cf049d', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ location: 'app/checkout/page.tsx:53', message: 'Payment API response received', data: { hasClientSecret: Boolean(response.data?.clientSecret), status: response.status, error: response.data?.error }, timestamp: Date.now(), sessionId: 'debug-session', runId: 'run1', hypothesisId: 'E' }) }).catch(() => { }); }
      // #endregion

      if (response.data.error) {
        throw new Error(response.data.error);
      }

      if (!response.data.clientSecret) {
        throw new Error('No client secret returned from payment API');
      }

      return response.data.clientSecret;
    } catch (error: any) {
      // #region agent log
      if (typeof window !== 'undefined') { fetch('http://127.0.0.1:7242/ingest/6fccf632-d8cd-4ca1-ba9f-13c486cf049d', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ location: 'app/checkout/page.tsx:66', message: 'fetchClientSecret error', data: { errorMessage: error?.message, status: error?.response?.status, statusText: error?.response?.statusText, responseData: error?.response?.data }, timestamp: Date.now(), sessionId: 'debug-session', runId: 'run1', hypothesisId: 'D' }) }).catch(() => { }); }
      // #endregion
      throw error;
    }
  }, [orderId, cartId]);



  // #region agent log
  useEffect(() => {
    if (typeof window !== 'undefined') {
      fetch('http://127.0.0.1:7242/ingest/6fccf632-d8cd-4ca1-ba9f-13c486cf049d', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ location: 'app/checkout/page.tsx:75', message: 'CheckoutPage useEffect - checking Stripe promise', data: { hasStripePromise: Boolean(stripePromise), stripeKey: stripePublishableKey?.substring(0, 20) + '...' }, timestamp: Date.now(), sessionId: 'debug-session', runId: 'run1', hypothesisId: 'E' }) }).catch(() => { });

      // Check if Stripe promise resolves
      if (stripePromise) {
        stripePromise.then((stripe) => {
          fetch('http://127.0.0.1:7242/ingest/6fccf632-d8cd-4ca1-ba9f-13c486cf049d', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ location: 'app/checkout/page.tsx:79', message: 'Stripe promise resolved', data: { hasStripe: Boolean(stripe) }, timestamp: Date.now(), sessionId: 'debug-session', runId: 'run1', hypothesisId: 'E' }) }).catch(() => { });
        }).catch((error: any) => {
          fetch('http://127.0.0.1:7242/ingest/6fccf632-d8cd-4ca1-ba9f-13c486cf049d', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ location: 'app/checkout/page.tsx:82', message: 'Stripe promise rejected', data: { errorMessage: error?.message }, timestamp: Date.now(), sessionId: 'debug-session', runId: 'run1', hypothesisId: 'E' }) }).catch(() => { });
        });
      }
    }
  }, [stripePromise, stripePublishableKey]);
  // #endregion

  // #endregion

  // Theme support
  const { theme } = useTheme();

  // Add error state for Stripe component
  const [stripeError, setStripeError] = useState<string | null>(null);

  const options = {
    fetchClientSecret,
  };

  return (
    <div id='checkout'>
      <CheckoutProgressBar currentStep='Payment' />
      {stripeError && (
        <div className='flex flex-col items-center justify-center min-h-[400px] p-8'>
          <h2 className='text-2xl font-bold mb-4'>Checkout Error</h2>
          <p className='text-muted-foreground mb-4'>{stripeError}</p>
          <a href='/cart' className='text-primary hover:underline'>
            Return to Cart
          </a>
        </div>
      )}
      {!stripeError && stripePromise && (
        <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      )}
      {!stripeError && !stripePromise && (
        <div className='flex flex-col items-center justify-center min-h-[400px] p-8'>
          <h2 className='text-2xl font-bold mb-4'>Loading Stripe...</h2>
        </div>
      )}
    </div>
  );
}
export default CheckoutPage;
