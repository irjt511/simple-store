import Stripe from 'stripe';

const stripe = new Stripe(import.meta.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10', // تأكد من تحديثه إذا تغيرت نسخة Stripe لاحقًا
});

export default stripe;
