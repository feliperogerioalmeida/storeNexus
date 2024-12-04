import { ShapesIcon } from "lucide-react";
import { Badge } from "../../_components/ui/badge";
import { db } from "../../_lib/prisma";
import CategoryItem from "./components/category-item";

const CatalogPage = async () => {

    const categories = await db.category.findMany({})
    
    return ( 
            <div className="p-5 gap-8 flex flex-col" >
                <Badge variant="heading">
                    <ShapesIcon size={16}/>
                    Catálogo
                </Badge>

            <div className="grid grid-cols-2 gap-8">
                {categories.map((category) => <CategoryItem key={category.id} category={category}/>)}
            </div>

            </div>

     );
}
 
export default CatalogPage;