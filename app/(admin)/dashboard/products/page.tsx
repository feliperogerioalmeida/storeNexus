import { db } from "@/app/_lib/prisma";

const ProductsPage = async () => {
    
    const products = await db.product.findMany()
    console.log(products)
    return ( 
        
        <h1>Products</h1>
     );
}
 
export default ProductsPage;