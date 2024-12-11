import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import { db } from "@/app/_lib/prisma";
import { ListOrderedIcon, PlusIcon } from "lucide-react";
import CategoriesTable from "./components/categories-table";

const CategoriesPage = async () => {
  const categories = await db.category.findMany({
    include: {
      products: {
        select: {
          id: true,
        },
      },
    },
  });

  return (
    <div className="flex w-full flex-col gap-10 p-10">
      <Badge variant="heading">
        <ListOrderedIcon size={18} />
        Categorias
      </Badge>

      <div className="flex w-full items-center justify-between">
        <p className="text-lg font-bold">
          Categorias encontradas: {categories.length}
        </p>
        <Button className="flex gap-2">
          <PlusIcon size={18} />
          Adicionar Categoria
        </Button>
      </div>

      <CategoriesTable categories={categories} />
    </div>
  );
};

export default CategoriesPage;
