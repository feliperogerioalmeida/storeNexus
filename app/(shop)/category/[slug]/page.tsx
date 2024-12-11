import { Badge } from "@/app/_components/ui/badge";
import ProductItem from "@/app/_components/ui/product-item";
import { db } from "@/app/_lib/prisma";
import { CATEGORY_ICON } from "@/app/constants/category-icon";
import { computeProductTotalPrice } from "@/app/helpers/product";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CategoryProducts = async ({ params }: any) => {
  const category = await db.category.findFirst({
    where: {
      slug: params.slug,
    },
    include: {
      products: true,
    },
  });

  if (!category) {
    return null;
  }

  return (
    <div className="mx-auto flex flex-col gap-8 p-5 lg:container lg:gap-10 lg:py-10">
      <Badge variant="heading">
        {CATEGORY_ICON[params.slug as keyof typeof CATEGORY_ICON]}
        {category.name}
      </Badge>

      <div className="grid grid-cols-2 gap-8 lg:grid-cols-6">
        {category.products.map((product) => (
          <ProductItem
            key={product.id}
            product={{
              ...product,
              totalPrice: computeProductTotalPrice(product),
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryProducts;
