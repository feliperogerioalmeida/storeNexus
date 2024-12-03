import { ArrowDownIcon } from "lucide-react";
import { Badge, BadgeProps } from "./badge";
import { cn } from "@/app/_lib/utils";


const DiscountBadge = ({children, className, ...props}: BadgeProps) => {
    return (  
        <Badge className={cn("px-2 py-[2px]",className)} {...props}>
            <ArrowDownIcon size={14}/> {children}%
        </Badge>

    );
}
 
export default DiscountBadge;