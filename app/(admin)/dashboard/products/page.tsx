import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import { db } from "@/app/_lib/prisma";
import { PackageIcon, PlusIcon } from "lucide-react";
import ProductsTable, { ProductWithTotalPriceAndCategory } from "./components/products-table";
import { computeProductTotalPrice } from "@/app/helpers/product";

const ProductsPage = async () => {
    
    const products = await db.product.findMany({
        include:{
            category:{
                select:{
                    name:true
                }
            }
        }
    })
    
    const productWithTotalPrice: ProductWithTotalPriceAndCategory[] = products.map((product) => 
    ({...computeProductTotalPrice(product), category: product.category})
        )

    return ( 
        
        <div className="flex flex-col gap-10 p-10 w-full">
            <Badge variant="heading">
                <PackageIcon size={18}/>
                Produtos
            </Badge>

            <div className="flex justify-between items-center w-full">
                <p className="font-bold text-lg">Produtos encontrados: {products.length}</p>
                <Button className="flex gap-2"> 
                    <PlusIcon size={18}/>
                    Adicionar Produto
                </Button>
            </div>

            <ProductsTable products={productWithTotalPrice}/>

        </div>
     );
}
 
export default ProductsPage;