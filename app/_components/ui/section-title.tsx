import { cn } from "@/app/_lib/utils";
import { ComponentProps } from "react";

const SectionTitle = ({
  children,
  className,
  ...props
}: ComponentProps<"p">) => {
  return (
    <p
      className={cn("mt-2 font-bold uppercase lg:text-xl", className)}
      {...props}
    >
      {" "}
      {children}{" "}
    </p>
  );
};

export default SectionTitle;
