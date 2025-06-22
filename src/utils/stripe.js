import { loadStripe } from '@stripe/stripe-js';
// --- (1) Stripe Promise ---
export const  stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
