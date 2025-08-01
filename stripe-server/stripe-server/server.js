const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
require('dotenv').config();

const app = express();
const PORT = 4242;

// 👇 هذا هو المهم عشان يحل المشكلة
app.use(cors({
  origin: 'http://localhost:5173', // هذا عنوان الموقع تبع Vite
  methods: ['POST'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json());

app.post('/create-checkout-session', async (req, res) => {
  const { items, customerName } = req.body;

  const line_items = items.map(item => ({
    price_data: {
      currency: 'sar',
      product_data: {
        name: item.name,
      },
      unit_amount: item.price * 100, // بالهللات
    },
    quantity: item.quantity,
  }));

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: 'http://localhost:5173/success',
      cancel_url: 'http://localhost:5173/cancel',
      metadata: {
        customerName,
      },
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Error creating Stripe session:', error);
    res.status(500).json({ error: 'خطأ في السيرفر' });
  }
});

app.listen(PORT, () => console.log(`✅ Stripe server running on http://localhost:${PORT}`));
