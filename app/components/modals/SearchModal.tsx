'use client';

import { formatISO } from 'date-fns';
import qs from 'query-string';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useMemo, useCallback } from 'react';
import { Range } from 'react-date-range';
import dynamic from 'next/dynamic';
import { StringifiableRecord } from 'query-string';

import Modal from './Modal';
import { CountrySelectValue } from '../inputs/CountrySelect';
import Heading from '../Heading';
import Counter from '../inputs/Counter';
import CountrySelect from '../inputs/CountrySelect';
import Calendar from '../inputs/Calendar';

import useSearchModal from '@/app/hooks/useSearchModal';

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

const SearchModal = () => {
  const router = useRouter();
  const params = useSearchParams();
  const searchModal = useSearchModal();

  const [location, setLocation] = useState<CountrySelectValue>();
  const [step, setStep] = useState(STEPS.LOCATION);
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });

  const Map = useMemo(
    () => dynamic(() => import('../Map'), { ssr: false }),
    [location]
  );

  const onBack = useCallback(() => setStep((value) => value - 1), []);
  const onNext = useCallback(() => setStep((value) => value + 1), []);

  const onSubmit = useCallback(async () => {
    if (step !== STEPS.INFO) {
      return onNext();
    }

    let currentQuery: StringifiableRecord = {};
    if (params) currentQuery = qs.parse(params.toString());

    const updatedQuery: StringifiableRecord = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount,
    };

    if (dateRange.startDate)
      updatedQuery.startDate = formatISO(dateRange.startDate);
    if (dateRange.endDate) updatedQuery.endDate = formatISO(dateRange.endDate);

    const url = qs.stringifyUrl(
      { url: '/', query: updatedQuery },
      { skipNull: true }
    );

    setStep(STEPS.LOCATION);
    searchModal.onClose();
    router.push(url);
  }, [
    step,
    location,
    guestCount,
    roomCount,
    bathroomCount,
    dateRange,
    params,
    router,
    onNext,
    searchModal,
  ]);

  const actionLabel = useMemo(
    () => (step === STEPS.INFO ? 'Search' : 'Next'),
    [step]
  );
  const secondaryActionLabel = useMemo(
    () => (step === STEPS.LOCATION ? undefined : 'Back'),
    [step]
  );

  // Body content change based on step
  let bodyContent;
  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where do you wanna go?"
          subtitle="Find the perfect location!"
        />
        <CountrySelect
          value={location}
          onChange={(value) => setLocation(value as CountrySelectValue)}
        />
        <hr />
        <Map center={location?.latlng as [number, number]} />
      </div>
    );
  } else if (step === STEPS.DATE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="When do you plan to go?"
          subtitle="Make sure everyone is free!"
        />
        <Calendar
          value={dateRange}
          onChange={(value) => setDateRange(value.selection)}
        />
      </div>
    );
  } else if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="More info" subtitle="Find yout perfect place!" />

        <Counter
          title="Guests"
          subtitle="How many guests are coming?"
          value={guestCount}
          onChange={(value) => setGuestCount(value)}
        />

        <Counter
          title="Rooms"
          subtitle="How many rooms do you need?"
          value={roomCount}
          onChange={(value) => setRoomCount(value)}
        />

        <Counter
          title="Bathrooms"
          subtitle="How many bathrooms do you need?"
          value={bathroomCount}
          onChange={(value) => setBathroomCount(value)}
        />
      </div>
    );
  }

  // Render the modal
  return (
    <Modal
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      onSubmit={onSubmit}
      title="Filters"
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
      body={bodyContent}
    />
  );
};

export default SearchModal;
