import { Badge } from "@/app/_components/ui/badge";
import { authOptions } from "@/app/_lib/auth";
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
  return (
    <div className="p-5 lg:container lg:mx-auto lg:py-10">
      <Badge variant="outline">
        <Heart size={16} />
          Meus Pedidos
      </Badge>
    </div>
  );
};

export default wishlist;
