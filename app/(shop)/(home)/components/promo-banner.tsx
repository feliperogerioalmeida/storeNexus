import { cn } from "@/app/_lib/utils";
import Image, { ImageProps } from "next/image";

const PromoBanner = ({ alt, className, ...props }: ImageProps) => {
  return (
    <Image
      width={0}
      height={0}
      className={cn("h-auto w-full", className)}
      sizes="100vw"
      alt={alt}
      {...props}
    />
  );
};

export default PromoBanner;
