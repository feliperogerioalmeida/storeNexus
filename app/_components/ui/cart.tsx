import { ShoppingCartIcon } from "lucide-react";
import { Badge } from "./badge";
import { useContext } from "react";
import { CartContext } from "@/app/_providers/cart";
import CartItem from "./cart-item";
import { computeProductTotalPrice } from "@/app/helpers/product";
import { Separator } from "./separator";
import { ScrollArea } from "./scroll-area";
import { Button } from "./button";
import { loadStripe} from "@stripe/stripe-js"
import { useSession } from "next-auth/react";
import { createOrder } from "@/app/actions/order";
import { createCheckout } from "@/app/actions/checkout";

const Cart = () => {
    const {data} = useSession()
    const { products, subtotal, total, totalDiscount } = useContext(CartContext)

    const handleFinishPurchaseClick = async () => {

        if (!data?.user) {
            // TODO: redirecionar para o login
            return;
        }
        
        const order = await createOrder(products, (data?.user as any).id);

        const checkout = await createCheckout(products, order.id)

        const stripe = await loadStripe(
            process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
        )

        stripe?.redirectToCheckout({
            sessionId: checkout.id
        });
    }

    return (
        <div className="flex flex-col h-full gap-8">
            <Badge variant="heading">
                <ShoppingCartIcon size={16}/>
                Carrinho
            </Badge>

            <div className="flex flex-col gap-5 h-full overflow-hidden">
                <ScrollArea className="h-full">
                    <div className="flex flex-col h-full gap-8">
                        {products.length > 0 ? (
                        products.map((product) => (
                            <CartItem
                            key={product.id}
                            product={computeProductTotalPrice(product as any) as any}
                            />
                        ))
                        ) : (
                        <p className="text-center font-semibold">
                            Carrinho vazio. Vamos fazer compras?
                        </p>
                        )}
                    </div>
                </ScrollArea>
            </div>

            {products.length > 0 && (

                <div className="flex flex-col gap-3">
                    <Separator />
                    
                    <div className="flex items-center justify-between text-xs lg:text-sm">
                        <p>Subtotal</p>
                        <p>R$ {subtotal.toFixed(2)}</p>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between text-xs lg:text-sm">
                        <p>Entrega</p>
                        <p>GRÁTIS</p>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between text-xs lg:text-sm">
                        <p>Descontos</p>
                        <p>- R$ {totalDiscount.toFixed(2)}</p>
                    </div>
                    
                    <Separator />

                    <div className="flex items-center justify-between text-sm font-bold lg:text-base">
                        <p>Total</p>
                        <p>R$ {total.toFixed(2)}</p>
                    </div>

                    <Button className="uppercase font-bold mt-7" onClick={handleFinishPurchaseClick}>Finalizar Compra</Button>

                </div>
            )}
        </div>
  );

}
 
export default Cart;