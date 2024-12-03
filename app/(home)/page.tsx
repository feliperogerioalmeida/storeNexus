import Categories from "./components/categories";
import { db } from "../_lib/prisma";
import ProductList from "../_components/ui/product-list";
import SectionTitle from "../_components/ui/section-title";
import PromoBanner from "./components/promo-banner";
import Link from "next/link";


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
          <Link href="/deals">
            <PromoBanner
              src="/deals-banner.png"
              className="hidden h-auto w-full lg:block"
              alt="Até 55% de desconto esse mês"
            />
          </Link> 
        </div>
      
        <div className="mx-auto flex flex-col gap-8 py-8 lg:container lg:gap-10">
          <Link href="/deals">
            <PromoBanner
              src= "/banner-home-01.png"
              alt="Até 55% de desconto esse mês!"
              className="lg:hidden"
            />
          </Link>
        </div>

        <div className=" px-5 lg:mt-2">
          <Categories/>
        </div>

        <div className="flex flex-col gap-3 lg:gap-5">
          <SectionTitle className="pl-5"> ofertas </SectionTitle>
          <ProductList products={deals}/>
        </div>

        <div className="flex flex-col lg:flex-row">
          <Link href="/category/mouses" className="flex flex-1">
            <PromoBanner
              src= "/banner-home-02.png"
              alt="Até 55% de desconto em mouses!"
              className="w-0 flex-1 px-5"
            />
          </Link>

          <Link href="/category/mouses" className="flex flex-1">
            <PromoBanner
              src= "/banner-home-03.png"
              alt="Até 55% de desconto em fones!"
              className="hidden w-0 flex-1 lg:block"
            />
          </Link>
        </div>
        

        <div className="flex flex-col gap-3 lg:gap-5">
          <SectionTitle className="pl-5"> teclados </SectionTitle>
          <ProductList products={keyboards}/>
        </div>

        <div>

          <Link href="/category/headphones">
            <PromoBanner
              src= "/banner-home-03.png"
              alt="Até 55% de desconto em fones!"
              className="px-5 lg:hidden"
            />
          </Link>
        </div>

        <Link href="/catalog">
          <PromoBanner
            src="/free-shipping-banner.png"
            alt="Frete grátis para todo o Brasil"
            className="hidden lg:block px-5"
          />
        </Link>


        <div className="flex flex-col gap-3 lg:gap-5">
          <SectionTitle className="pl-5"> mouses </SectionTitle>
          <ProductList products={mouses}/>
        </div>
      </>

  );
}
