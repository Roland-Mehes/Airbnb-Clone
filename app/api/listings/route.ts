import { NextResponse } from 'next/server';

import prisma from '@/app/libs/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  // Check if the user is authenticated
  if (!currentUser || !currentUser.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const {
    title,
    description,
    imageSrc,
    category,
    roomCount,
    bathroomCount,
    guestCount,
    location,
    price,
  } = body;

  // Validate required fields
  if (
    !title ||
    !description ||
    !imageSrc ||
    !category ||
    !roomCount ||
    !bathroomCount ||
    !guestCount ||
    !location ||
    !price
  ) {
    return NextResponse.json(
      { error: 'Missing required fields' },
      { status: 400 }
    );
  }

  // Parse and validate price
  const parsedPrice = parseInt(price, 10);
  if (isNaN(parsedPrice)) {
    return NextResponse.json({ error: 'Invalid price value' }, { status: 400 });
  }

  try {
    // Create the listing
    const listing = await prisma.listing.create({
      data: {
        title,
        description,
        imageSrc,
        category,
        roomCount,
        bathroomCount,
        guestCount,
        locationValue: location.value,
        price: parsedPrice,
        userId: currentUser.id,
      },
    });

    return NextResponse.json(listing);
  } catch (error) {
    console.error('Error creating listing:', error);
    return NextResponse.json(
      { error: 'Failed to create listing' },
      { status: 500 }
    );
  }
}
