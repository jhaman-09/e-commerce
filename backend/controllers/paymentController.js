import Stripe from "stripe";
export const paymentGateway = async (req, res) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  try {
    const { cartProducts } = req.body;

    // this should be post req in which all the products added in the cart come in the Array form
    // Check if cartProducts array exists in req.body
    if (!cartProducts || !Array.isArray(cartProducts)) {
      return res.status(400).json({ message: "Invalid request", error: true });
    }

    const lineItems = cartProducts.map((item) => {
      return {
        price_data: {
          currency: "inr",
          product_data: {
            name: item.product.productName,
            images: [item.product.productImage[0]],
          },
          unit_amount: Math.round(item.product.sellingPrice * 100), // Convert INR to paise
        },
        adjustable_quantity: {
          enabled: true,
          minimum: 1,
        },
        quantity: item.quantity,
      };
    });

    const payload = {
      submit_type: "pay",
      mode: "payment",
      payment_method_types: ["card"],
      billing_address_collection: "auto",
      shipping_options: [{ shipping_rate: process.env.SHIPPING_SECRET_KEY }],
      line_items: lineItems,
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    };

    const session = await stripe.checkout.sessions.create(payload);
    res.status(200).json({ sessionId: session.id });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Error occurred while processing payment",
      error: true,
      success: false,
    });
  }
};
