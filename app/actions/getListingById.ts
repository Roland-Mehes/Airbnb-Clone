import prisma from '@/app/libs/prismadb';

interface IParams {
  listingId?: string;
}

export default async function getListingById({ listingId }: IParams) {
  try {
    if (!listingId || typeof listingId !== 'string') {
      return null;
    }

    const listing = await prisma.listing.findUnique({
      where: { id: listingId },
      include: { user: true },
    });

    if (!listing) {
      return null;
    }

    return {
      ...listing,
      createdAt: listing.createdAt.toISOString(),
      user: {
        ...listing.user,
        createdAt: listing.user.createdAt.toISOString(),
        updatedAt: listing.user.updatedAt.toISOString(),
        emailVerified: listing.user.emailVerified
          ? listing.user.emailVerified.toISOString()
          : null,
      },
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Unknown error in getListingById');
  }
}
