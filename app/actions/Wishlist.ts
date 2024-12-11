"use server";

import { db } from "../_lib/prisma";

export const addProductToWishList = async (
  userId: string,
  productId: string,
  WishListId?: string,
) => {
  let wishlist;

  if (WishListId) {
    wishlist = await db.wishList.findFirstOrThrow({
      where: {
        userId: userId,
        id: WishListId,
      },
    });
  }

  if (!WishListId) {
    wishlist = await db.wishList.create({
      data: {
        userId: userId,
        name: "Favoritos",
      },
    });
  }

  await db.product.update({
    where: {
      id: productId,
    },
    data: {
      wishLists: {
        connect: {
          id: wishlist!.id,
        },
      },
    },
  });
};
