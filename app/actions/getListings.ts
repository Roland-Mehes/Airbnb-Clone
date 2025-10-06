import prisma from '@/app/libs/prismadb';

export interface IListingsParams {
  userId?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
}

export default async function getListings(
  params: IListingsParams | Promise<IListingsParams> = {}
) {
  const resolvedParams = await Promise.resolve(params);
  const {
    userId,
    guestCount,
    roomCount,
    bathroomCount,
    startDate,
    endDate,
    locationValue,
    category,
  } = resolvedParams;

  try {
    const listings = await prisma.listing.findMany({
      where: {
        ...(userId && { userId }),
        ...(category && { category }),
        ...(locationValue && { locationValue }),
        ...(roomCount && { roomCount: { gte: Number(roomCount) } }),
        ...(guestCount && { guestCount: { gte: Number(guestCount) } }),
        ...(bathroomCount && { bathroomCount: { gte: Number(bathroomCount) } }),
        ...(startDate &&
          endDate && {
            NOT: {
              reservations: {
                some: {
                  OR: [
                    {
                      startDate: { lte: new Date(endDate) },
                      endDate: { gte: new Date(startDate) },
                    },
                    {
                      startDate: { gte: new Date(startDate) },
                      endDate: { lte: new Date(endDate) },
                    },
                  ],
                },
              },
            },
          }),
      },
      orderBy: { createdAt: 'desc' },
    });

    return listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Unknown error occurred while fetching listings.');
  }
}
