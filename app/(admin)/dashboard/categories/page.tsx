import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import { db } from "@/app/_lib/prisma";
import { ListOrderedIcon, PlusIcon } from "lucide-react";

const CategoriesPage = async () => {
    
    const categories = await db.category.findMany({
        include:{
            products:{
                select:{
                    id: true
                }        
            }
        }
    })

    return ( 
        
        <div className="flex flex-col gap-10 p-10 w-full">
            <Badge variant="heading">
                <ListOrderedIcon size={18}/>
                Categorias
            </Badge>

            <div className="flex justify-between items-center w-full">
                <p className="font-bold text-lg">Categorias encontradas: {categories.length}</p>
                <Button className="flex gap-2"> 
                    <PlusIcon size={18}/>
                    Adicionar Categoria
                </Button>
            </div>


        </div>
     );
}
 
export default CategoriesPage;