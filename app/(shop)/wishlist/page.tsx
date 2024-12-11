import { Badge } from "@/app/_components/ui/badge";
import WishListItem from "@/app/_components/ui/wishlist-item";
import { authOptions } from "@/app/_lib/auth";
import { db } from "@/app/_lib/prisma";
import { Heart } from "lucide-react";
import { getServerSession } from "next-auth";

const wishlist = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2 p-5">
        <h2 className="font-bold">Acesso Negado!</h2>
        <p className="text-sm opacity-60">
          Faça login para ver a sua lista de desejos
        </p>
      </div>
    );
  }

  const wishlist = await db.product.findMany({
    where: {
      wishLists: {
        some: {
          userId: session.user.id,
        },
      },
    },
    include: {
      wishLists: true,
    },
  });

  if (wishlist.length == 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2 p-5">
        <h2 className="font-bold">Nenhum favorito!</h2>
        <p className="text-sm opacity-60">
          Adicione produtos à sua lista de favoritos
        </p>
      </div>
    );
  }

  return (
    <div className="p-5 lg:container lg:mx-auto lg:py-10">
      <Badge variant="heading">
        <Heart size={16} />
        Favoritos
      </Badge>

      <div className="mt-4 grid grid-cols-2 gap-8">
        {wishlist.map((product) => (
          <WishListItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default wishlist;
