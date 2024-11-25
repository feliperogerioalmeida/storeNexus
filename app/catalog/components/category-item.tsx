import { Category } from "@prisma/client";
import Image from "next/image";

interface CategoryItemProps{
    category: Category
}

const CategoryItem = ({category} : CategoryItemProps) => {
    return (  
        <div className="flex flex-col ">
            <div className=" bg-category-item-gradient rounded-tl-lg rounded-tr-lg w-full h-[150px] items-center justify-center flex">
                <Image
                    src={category.imageUrl}
                    alt={category.name}
                    height={0}
                    width={0}
                    sizes="100vw"
                    className="h-auto w-auto max-w-[80%] max-h-[70%]"
                    style={{
                        objectFit: "contain"
                    } }  
                />
            </div>

            <div className="bg-accent py-3 rounded-br-lg rounded-bl-lg">
                <p className="text-center font-semibold text-sm">{category.name}</p>
            </div>
        </div>     
    );
}    
export default CategoryItem;