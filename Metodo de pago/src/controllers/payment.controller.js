import Stripe from "stripe";
import { STRIPE_PRIVATE_KEY } from "../config.js";

const stripe = new Stripe('sk_test_51Q9emi2KHo4QZYvVz0mTevHE1UWTTARtvPvF28pm6WLE65imQQAtCRJ0vevHXmvsw2aFvCuO2bUbRt8qTZTDYLFm00AR7FTkpP')

export const createSession = async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            product_data: {
              name: "Laptop",
            },
            currency: "usd",
            unit_amount: 2000,
          },
          quantity: 1,
        },
        {
          price_data: {
            product_data: {
              name: "TV",
            },
            currency: "usd",
            unit_amount: 1000,
          },
          quantity: 2,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:4000/success",
      cancel_url: "http://localhost:4000/cancel",
    });

    console.log(session);
    return res.json({ url: session.url });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
