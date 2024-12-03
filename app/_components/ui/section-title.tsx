import { cn } from "@/app/_lib/utils";
import { ComponentProps } from "react";

const SectionTitle = ({children, className, ...props } : ComponentProps<"p">) => {
    return ( 
        <p className={cn("font-bold uppercase pl-5 mb-3", className)} {...props}> {children} </p>
     );
}
 
export default SectionTitle;