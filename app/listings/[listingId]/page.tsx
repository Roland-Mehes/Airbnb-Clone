import getListingById from '@/app/actions/getListingById';
import getCurrentUser from '@/app/actions/getCurrentUser';
import getReservations from '@/app/actions/getReservations';

import EmptyState from '@/app/components/EmptyState';
import ListingClient from './ListingClient';

interface IParams {
  listingId?: string;
}

const ListingPage = async ({
  params,
}: {
  params: IParams | Promise<IParams>;
}) => {
  const { listingId } = await params;

  const reservation = await getReservations({ listingId });
  const listing = await getListingById({ listingId });
  const currentUser = await getCurrentUser();

  if (!listing) {
    return <EmptyState />;
  }

  return (
    <ListingClient
      listing={listing}
      reservations={reservation}
      currentUser={currentUser}
    />
  );
};

export default ListingPage;
