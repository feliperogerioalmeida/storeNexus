import { db } from "@/app/_lib/prisma";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-02-24.acacia",
});

export const POST = async (request: Request) => {
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.error();
  }

  const text = await request.text();

  const event = stripe.webhooks.constructEvent(
    text,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET_KEY as string,
  );

  if (event.type == "checkout.session.completed") {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const session = event.data.object as any;
    // eslint-disable-next-line no-unused-vars
    const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
      event.data.object.id,
      {
        expand: ["line_items"],
      },
    );

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const lineItems = sessionWithLineItems.line_items;

    //ATUALIZAR PEDIDO
    await db.order.update({
      where: {
        id: session.metadata.orderId,
      },
      data: {
        status: "PAYMENT_CONFIRMED",
      },
    });
  }

  return NextResponse.json({ received: true });
};
