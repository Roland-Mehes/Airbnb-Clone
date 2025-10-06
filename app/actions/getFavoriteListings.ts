import prisma from '@/app/libs/prismadb';
import getCurrentUser from './getCurrentUser';

export default async function getFavoriteListings() {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return [];
    }
    const favorite = await prisma.listing.findMany({
      where: {
        id: { in: [...(currentUser.favoriteIds || [])] },
      },
    });

    const safeFavorite = favorite.map((favorite) => ({
      ...favorite,
      createdAt: favorite.createdAt.toISOString(),
    }));

    return safeFavorite;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error(
        'Unknown error occurred while fetching favorite listings.'
      );
    }
  }
}
