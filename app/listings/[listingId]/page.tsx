import getListingById from '@/app/actions/getListingById';
import getCurrentUser from '@/app/actions/getCurrentUser';

import EmptyState from '@/app/components/EmptyState';
import ListingClient from './ListingClient';

interface IParams {
  listingId?: string;
}

const ListingPage = async ({ params }: { params: Promise<IParams> }) => {
  const { listingId } = await params; // 🔑 fontos: await kell!

  const listing = await getListingById({ listingId });
  const currentUser = await getCurrentUser();

  if (!listing) {
    return <EmptyState />;
  }

  return <ListingClient listing={listing} currentUser={currentUser} />;
};

export default ListingPage;
