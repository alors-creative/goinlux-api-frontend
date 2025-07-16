import { AmenitiesFormClient } from '@/app/_components/amenities/AmenitiesFormClient';

function AmenitiesForm({ amenity, onCloseModal }) {
  return (
    <>
      <AmenitiesFormClient amenity={amenity} onCloseModal={onCloseModal} />
    </>
  );
}

export default AmenitiesForm;
