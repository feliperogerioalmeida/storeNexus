import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";
import { PackageSearchIcon } from "lucide-react";
import { Badge } from "../_components/ui/badge";
import { db } from "../_lib/prisma";
import OrderItem from "./components/order-item";

async function OrderPage() {
    
    const user = getServerSession(authOptions)
    
    if (!user){
        return <p>Acess Denied</p>
    }
    const orders = await db.order.findMany({
        where:{
            userId: (user as any).id,
        },
        include:{
            orderProducts:{
                include:{
                    product:true
                }
            }
        }
    })

    return (   
        <div className="p-5">
            <Badge className="w-fit gap-1 text-base uppercase border-primary px-3 py-[0.375rem] border-2" variant="outline">
                <PackageSearchIcon size={16}/>
                Meus Pedidos
            </Badge>
        
            <div className="flex flex-col gap-5 mt-5">
                {orders.map(order => (
                    <OrderItem key={order.id} order={order}/>
                ))}
            </div>
        
        </div>
    );
}
 
export default OrderPage; 
