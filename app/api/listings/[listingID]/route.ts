import { NextResponse } from 'next/server';

import getCurrentUser from '../../../actions/getCurrentUser';
import prisma from '../../../libs/prismadb';

interface IParams {
  listingID?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<IParams> }
) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingID } = await params;

  if (!listingID || typeof listingID !== 'string') {
    throw new Error('Invalid ID');
  }
  const listing = await prisma.listing.deleteMany({
    where: {
      id: listingID,
      userId: currentUser.id,
    },
  });
  return NextResponse.json(listing);
}
