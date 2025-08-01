import { NextApiRequest, NextApiResponse } from 'next';
import stripe from '../lib/stripe';

// راح تستقبل المنتج من جهة العميل
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { product } = req.body;

    if (!product || !product.name || !product.price) {
      return res.status(400).json({ message: 'Invalid product data' });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'sar',
            product_data: {
              name: product.name,
              description: product.description || '',
            },
            unit_amount: product.price * 100, // بـ هللات
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.origin}/success`,
      cancel_url: `${req.headers.origin}/cancel`,
    });

    return res.status(200).json({ id: session.id });
  } catch (error) {
    console.error('Stripe Checkout Error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
