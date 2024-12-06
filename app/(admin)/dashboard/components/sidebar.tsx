"use client"

import { Button } from "@/app/_components/ui/button";
import {LayoutDashboardIcon, ListOrderedIcon, PackageIcon, PackageSearchIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
    const path = usePathname()

    return ( 
        <div className="flex flex-col min-w-[300px] bg-background border-r border-solid border-accent p-8 gap-8 items-center">
           
            <h1 className="text-lg font-semibold">
                <span className="text-primary">Orbi</span> Store
            </h1>

            <div className="flex flex-col gap-3 w-full">
                
                <Button variant="outline" className="justify-start w-full flex gap-2">
                    <LayoutDashboardIcon size={16}/>
                    Dashboard
                </Button>

                <Link href='/dashboard/products'>
                    <Button variant="outline" className={`justify-start w-full flex gap-2 ${path.includes('/products') && 'bg-primary text-white hover:bg-primary'}}`}>
                        <PackageIcon size={16}/>
                        Produtos
                    </Button>
                </Link>
                
                <Link href='/dashboard/categories'>
                    <Button variant="outline" className={`justify-start w-full flex gap-2 ${path.includes('/categories') && 'bg-primary text-white hover:bg-primary'}}`}>
                        <ListOrderedIcon size={16} />
                        Categorias
                    </Button>
                    
                </Link>

                <Link href='/dashboard/orders'>
                    <Button variant="outline" className={`justify-start w-full flex gap-2 ${path.includes('/orders') && 'bg-primary text-white hover:bg-primary'}}`}>
                        <PackageSearchIcon size={16}/>
                        Pedidos
                    </Button>
                </Link>
            </div>
        </div>
     );
}
 
export default Sidebar;