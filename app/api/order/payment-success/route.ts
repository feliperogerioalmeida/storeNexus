import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe( process.env.STRIPE_SECRET_KEY as string, {
    apiVersion:"2024-11-20.acacia"
})

export const POST = async (request: Request) => {
    const signature = request.headers.get("stripe-signature")

    if (!signature){
        return NextResponse.error()
    }


    const text = await request.text();

    const event = stripe.webhooks.constructEvent(
        text,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET_KEY as string
    )

    if (event.type == "checkout.session.completed"){

        const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
            event.data.object.id,
            {
                expand:['line_items']
            }
        );

        const lineItems = sessionWithLineItems.line_items

        //TO DO: CRIAR PEDIDO
    }

    return NextResponse.json({ received: true })
}

