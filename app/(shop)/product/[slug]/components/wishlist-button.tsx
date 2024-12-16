import { toast } from "sonner";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { addProductToWishList } from "@/app/actions/Wishlist";
import LoadingButton from "@/app/_components/ui/loading-button";
import { StarIcon } from "lucide-react";

interface WishListButtonProps {
  productId: string;
}

const WishListButton = ({ productId }: WishListButtonProps) => {
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
      return;
    }

    await addProductToWishList(session.user.id, productId);

    toast("Produto adicionado aos favoritos", {
      action: {
        label: "Ver Favoritos",
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
      <StarIcon />
      Favoritos
    </LoadingButton>
  );
};

export default WishListButton;
