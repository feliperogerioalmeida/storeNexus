import Categories from "./components/categories";
import { db } from "../_lib/prisma";
import ProductList from "../_components/ui/product-list";
import SectionTitle from "../_components/ui/section-title";
import PromoBanner from "./components/promo-banner";
import Image from "next/image";


export default async function Home() {
  const deals = await db.product.findMany({
    where:{
      discountPercentage:{
        gt: 0
      },
    },
  }) 

  const keyboards = await db.product.findMany({
    where: {
      category:{
        slug : "keyboards"
      }
    }
  })

  const mouses = await db.product.findMany({
    where: {
      category:{
        slug : "mouses"
      }
    }
  })
 
  return (
      <>
        <div className="mx-auto max-w-[1920px]">
          <Image
            src="/deals-banner.png"
            className="hidden h-auto w-full lg:block"
            width={0}
            height={0}
            sizes="100vw"
            alt="Até 55% de desconto esse mês"
          />
          
        </div>
      
        <div className="mx-auto flex flex-col gap-8 py-8 lg:container lg:gap-10">
          <PromoBanner
            src= "/banner-home-01.png"
            alt="Até 55% de desconto esse mês!"
            className="lg:hidden"
          />
        </div>

        <div className=" px-5 lg:mt-2">
          <Categories/>
        </div>

        <div className="flex flex-col gap-3 lg:gap-5">
          <SectionTitle className="pl-5"> ofertas </SectionTitle>
          <ProductList products={deals}/>
        </div>

        <div className="flex flex-col lg:flex-row">
          <PromoBanner
            src= "/banner-home-02.png"
            alt="Até 55% de desconto em mouses!"
            className="w-0 flex-1"
          />

          <PromoBanner
            src= "/banner-home-03.png"
            alt="Até 55% de desconto em fones!"
            className="hidden w-0 flex-1 lg:block"
          />
        </div>
        

        <div className="flex flex-col gap-3 lg:gap-5">
          <SectionTitle className="pl-5"> teclados </SectionTitle>
          <ProductList products={keyboards}/>
        </div>

        <div>
          <PromoBanner
            src= "/banner-home-03.png"
            alt="Até 55% de desconto em fones!"
            className="lg:hidden"
          />
        </div>
      

        <div className="flex flex-col gap-3 lg:gap-5">
          <SectionTitle className="pl-5"> mouses </SectionTitle>
          <ProductList products={mouses}/>
        </div>
      </>

  );
}
