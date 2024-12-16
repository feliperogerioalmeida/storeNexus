import { toast } from "sonner";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { addProductToWishList } from "@/app/actions/Wishlist";
import LoadingButton from "@/app/_components/ui/loading-button";
import { StarIcon } from "lucide-react";
import { WishList } from "@prisma/client";

interface WishListButtonProps {
  productId: string;
  wishLists: WishList[];
}

const WishListButton = ({ productId, wishLists }: WishListButtonProps) => {
  const { data: session } = useSession();

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleAddToWishList = async () => {
    setLoading(true);

    if (!session || !session.user) {
      toast(
        "Você precisa estar logado para adicionar produtos aos favoritos.",
        {
          action: {
            label: "Login",
            onClick: () => {
              signIn();
            },
          },
          classNames: {
            toast: "bg-red-500 border-red-500",
            title: "text-white",
            actionButton: "!text-red-500 !bg-white font-bold",
          },
        },
      );

      setLoading(false);
      return;
    }

    await addProductToWishList(session.user.id, productId);

    router.refresh();

    toast("Produto adicionado aos favoritos", {
      action: {
        label: "Ver favoritos",
        onClick: () => {
          router.push("/wishlist");
        },
      },
    });

    setLoading(false);
  };

  return (
    <LoadingButton
      loading={loading}
      textWaiting="Adicionando aos favoritos"
      className="uppercase"
      onClick={handleAddToWishList}
    >
      <StarIcon
        className={`h-5 w-5 ${wishLists?.length > 0 ? "fill-white" : ""}`}
      />
      Favoritos
    </LoadingButton>
  );
};

export default WishListButton;
