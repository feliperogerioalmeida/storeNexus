"use server"

import { CartProduct } from "../_providers/cart"
import Stripe from "stripe"


export const createCheckout = async  (products: CartProduct[]) => {

    //CRIAR CHECKOUT
    const stripe = new Stripe(process.env.STRIPE_SECRETE_KEY as string, {
        apiVersion: "2024-11-20.acacia"
    }
    )

    const checkout = await stripe.checkout.sessions.create({
        payment_method_types:["card"],
        mode:"payment",
        success_url: process.env.HOST_URL as string,
        cancel_url: process.env.HOST_URL as string,
        line_items: products.map(product =>{
            return {
                price_data:{
                    currency: "brl",
                    product_data:{
                        name: product.name,
                        description: product.description,
                        images: product.imageUrls
                    },
                    unit_amount: product.totalPrice * 100
                },
                quantity: product.quantity
            };
        })
    })
    
    //RETORNAR CHECKOUT

    return checkout

}