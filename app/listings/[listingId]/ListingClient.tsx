'use client';

import { Range } from 'react-date-range';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { differenceInCalendarDays, eachDayOfInterval } from 'date-fns';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import useLoginModal from '@/app/hooks/useLoginModal';

import { SafeListing, SafeReservation, SafeUser } from '@/app/types';
import { categories } from '../../components/navbar/Categories';
import Container from '@/app/components/Container';
import ListingHead from '@/app/components/listings/ListingHead';
import ListingInfo from '@/app/components/listings/ListingInfo';
import ListingReservation from '@/app/components/listings/ListingReservation';

// Initial date range for the reservation picker
const initialDateRage = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection',
};

interface ListingClientProps {
  reservations?: SafeReservation[]; // List of existing reservations for the listing
  listing: SafeListing & { user: SafeUser }; // Listing details with the user who created it
  currentUser?: SafeUser | null; // Currently logged-in user (if any)
}

const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  currentUser,
  reservations = [],
}) => {
  const loginModal = useLoginModal();
  const router = useRouter();

  // Compute disabled dates based on existing reservations
  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range]; // Add all dates within the reservation range
    });
    return dates;
  }, [reservations]);

  const [isLoading, setIsLoading] = useState(false); // Tracks loading state for reservation creation
  const [totalPrice, setTotalPrice] = useState(listing.price); // Tracks the total price for the selected date range
  const [dateRange, setDateRange] = useState<Range>(initialDateRage); // Tracks the selected date range

  // Handles reservation creation
  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      // If no user is logged in, open the login modal
      return loginModal.onOpen();
    }
    setIsLoading(true);

    axios
      .post('/api/reservations', {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing?.id,
      })
      .then(() => {
        toast.success('Listing reserved!');
        setDateRange(initialDateRage);
        router.push('/trips'); // Redirect to the trips page after successful reservation
      })
      .catch(() => {
        toast.error('Something went wrong');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [currentUser, totalPrice, dateRange, listing?.id, loginModal, router]);

  // Update total price whenever the date range changes
  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );

      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price); // Calculate total price based on the number of days
      } else {
        setTotalPrice(listing.price); // Default to the listing price if no valid range
      }
    }
  }, [dateRange, listing.price]);

  // Find the category details for the current listing
  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category);
  }, [listing]);

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          {/* Listing header with title, image, and location */}
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />
          <div
            className="
          grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6
          "
          >
            {/* Listing information (e.g., description, room count, etc.) */}
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
            />
            <div
              className="
            order-first mb-10 md:order-last md:col-span-3"
            >
              {/* Reservation section with date picker and price calculation */}
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate={(value) => setDateRange(value)} // Update date range
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                disabled={isLoading} // Disable inputs while loading
                disabledDates={disabledDates} // Disable already reserved dates
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
