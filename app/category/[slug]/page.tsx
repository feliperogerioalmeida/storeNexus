import { Badge } from "@/app/_components/ui/badge";
import ProductItem from "@/app/_components/ui/product-item";
import { db } from "@/app/_lib/prisma";
import { CATEGORY_ICON } from "@/app/constants/category-icon";
import { computeProductTotalPrice } from "@/app/product";


const CategoryProducts = async ({params}: any) => {
    
    const category = await db.category.findFirst({
        where:{
            slug: params.slug
        },
        include:{
            products: true
        }
    });

    if (!category) {
        return null;
    }
    
    
    return (  
        <div className="flex flex-col gap-8 p-5">
            <Badge className="w-fit gap-1 text-base uppercase border-primary px-3 py-[0.375rem] border-2" variant="outline">
                    {CATEGORY_ICON[params.slug as keyof typeof CATEGORY_ICON]}
                    {category.name}
            </Badge>

            <div className="grid grid-cols-2 gap-8">
                {category.products.map(product => <ProductItem key={product.id} product = {computeProductTotalPrice(product)}/>)}
            </div>

        </div>
    );
}
 
export default CategoryProducts;