import { computeProductTotalPrice } from "@/app/helpers/product";
import { OrderProduct, Prisma } from "@prisma/client";
import Image from "next/image";

interface OrderProductItemProps{
    orderProduct: Prisma.OrderProductGetPayload<{
        include: {
            product: true
        }
    }>
}

const OrderProductItem = ({orderProduct}: OrderProductItemProps) => {

    const productWithTotalPrice = computeProductTotalPrice(orderProduct.product)

    return ( 
        <div className="flex items-center gap-4">
            <div className=".bg-accent rounded-lg w-[100px] h-[77px] flex items-center justify-center">
                <Image
                    src={orderProduct.product.imageUrls[0]}
                    alt={orderProduct.product.name}
                    width={0}
                    height={0}
                    className="w-auto h-auto max-h-[80%] max-w-[80%] object-contain"
                    sizes="100vw"
                />
            </div>
            
            <div className="flex flex-col gap-1 w-full">
                
                <div className="flex bg-accent px-3 py-1 rounded-md w-fit">
                    <p className="text-[10px]">Vendido e entregue por <span className="font-bold">Orbi Store</span></p>
                </div>    
                <p className="text-xs">{orderProduct.product.name}</p>

                <div className="flex items-center gap-1 justify-between w-full">
                    <div className="flex items-center gap-1">
                        <p className="text-sm font-bold">R$ {productWithTotalPrice.totalPrice.toFixed(2)}</p>

                        {productWithTotalPrice.discountPercentage > 0 &&(
                            <p className="opacity-60 text-xs line-through"> R$ {Number(productWithTotalPrice.basePrice).toFixed(2)}</p>
                        )}  

                    </div>
                    
                    <p className="text-xs opacity-60"> Qntd: {orderProduct.quantity}</p>

                </div>               
            </div>

        </div>
     );
}
 
export default OrderProductItem;