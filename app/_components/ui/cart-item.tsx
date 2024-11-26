import { CartContext, CartProduct } from "@/app/_providers/cart";
import { ArrowLeftIcon, ArrowRightIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "./button";
import { useContext } from "react";

interface CartItemProps{
    product: CartProduct
}

const CartItem = ({product}: CartItemProps) => {

    const {
        decreaseProductQuantity,
        increaseProductQuantity,
      } = useContext(CartContext);
    
      const handleDecreaseProductQuantityClick = () => {
        decreaseProductQuantity(product.id);
      };
    
      const handleIncreaseProductQuantityClick = () => {
        increaseProductQuantity(product.id);
      };

    return ( 
        <div className="flex items-center justify-between">
            <div className=" flex items-center gap-4">
                <div className="bg-accent flex items-center justify-center rounded-lg h-[77px] w-[77px]">
                    <Image
                        src={product.imageUrls[0]}
                        alt={product.name}
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="w-auto h-auto max-w-[80%] max-h-[70%]"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <p className="text-xs">{product.name}</p>

                    <div className="flex items-center gap-2"> 
                        <p className="text-sm font-bold">
                            R$ {product.totalPrice.toFixed(2)}
                        </p>

                        {product.discountPercentage > 0 &&(
                            <p className="opacity-75 text-xs line-through"> 
                                {Number(product.basePrice).toFixed(2)}
                            </p>
                        )}
                    </div>

                    <div className="flex items-center gap-1">
                        <Button 
                            size="icon" 
                            variant="outline" 
                            className="h-8 w-8" 
                            onClick={handleDecreaseProductQuantityClick}>
                            
                            <ArrowLeftIcon size={16} className="h-4 w-4" />
                        </Button>

                        <span className="text-xs"> {product.quantity} </span>
                        
                        <Button 
                            size="icon" 
                            variant="outline" 
                            className="h-8 w-8"
                            onClick={handleIncreaseProductQuantityClick}
                            >
                            <ArrowRightIcon size={16} className="h-4 w-4"/>
                        </Button>
                    </div>
                </div>
            </div>

            <Button size="icon" variant="outline" className="h-8 w-8">
                <TrashIcon size={16} className="h-4 w-4"/>
            </Button>

        </div>

    );
}
 
export default CartItem;