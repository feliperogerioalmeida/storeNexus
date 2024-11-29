import { ProductWithTotalPrice } from "@/app/helpers/product";
import Image from "next/image"
import Link from "next/link";
import DiscountBadge from "./discount-badge";
import { cn } from "@/app/_lib/utils";

interface ProductItemProps {
    product: ProductWithTotalPrice,
    className?: string
}

const ProductItem = ({product, className}: ProductItemProps) => {
    return ( 
        <Link href={`/product/${product.slug}`}
        className={cn("flex min-w-[156px] flex-col gap-4", className)}
        >

            
            <div className="relative flex aspect-square w-full items-center justify-center rounded-lg bg-accent">
                    <Image
                        src={product.imageUrls[0]}
                        height={0}
                        width={0}
                        sizes="100vw"
                        className="h-auto w-auto max-w-[80%] max-h-[70%] object-contain"
                        alt={product.name}
                    />

                    {product.discountPercentage > 0 &&(
                       <DiscountBadge className="absolute top-3 left-3">
                        {product.discountPercentage}
                       </DiscountBadge>
                    )} 
                </div>

                <div className="flex flex-col gap-1">
                    <p className="text-sm truncate">{product.name}</p>

                    <div className="flex items-center gap-2">
                        {product.discountPercentage > 0 ? (
                            <>
                                <p className="font-semibold truncate"> R$ {product.totalPrice.toFixed(2)}</p>

                                <p className="opacity-75 line-through text-xs truncate"> R$ {Number(product.basePrice).toFixed(2)}</p>
                            </>

                        ) : (
                            <p className="font-semibold"> R$ {product.basePrice.toFixed(2)}</p>
                        )}


                    </div>    

                </div>
        </Link>


     );
}
 
export default ProductItem