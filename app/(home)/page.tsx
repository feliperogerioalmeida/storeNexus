
import Image from "next/image";
import Categories from "./components/categories";
import { db } from "../_lib/prisma";
import ProductList from "./components/product-list";


export default async function Home() {
  const deals = await db.product.findMany({
    where:{
      discountPercentage:{
        gt: 0
      },
    },
  })
 
  return (
    <div>
     <Image
      src= "/banner-home-01.png"
      alt="Até 55% de desconto esse mês!"
      width={0}
      height={0}
      className="h-auto w-full px-5"
      sizes="100vw"
     />

      <div className="mt-8 px-5">
        <Categories/>
      </div>

      <div className="mt-8">
        <p className="font-bold uppercase pl-5 mb-3"> ofertas </p>

        <ProductList products={deals}/>
      </div>

      <Image
      src= "/banner-home-02.png"
      alt="Até 55% de desconto em mouses!"
      width={0}
      height={0}
      className="h-auto w-full px-5"
      sizes="100vw"
     />

    </div>
  );
}
