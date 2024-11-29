"use server"

import { db } from "../_lib/prisma";
import { CartProduct } from "../_providers/cart";

export const createOrder = async (cartProducts: CartProduct[], userId: string) => {   
    
    const order = await db.order.create({
        data: {
            userId,
            status: "WAITING_FOR_PAYMENT",
            orderProducts:{
                createMany:{
                    data: cartProducts.map((product) => ({
                        basePrice: Number(product.basePrice).toFixed(2),
                        discountPercentage: product.discountPercentage,
                        productId : product.id,
                        quantity: product.quantity
                    })),
                },
            },
        }
    })

    return order
}