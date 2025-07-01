import { AmenitiesFormClient } from '@/app/_components/amenities/AmenitiesFormClient';

function AmenitiesForm({ amenity, onCloseModal }) {
  return (
    <>
      <div>
        <AmenitiesFormClient amenity={amenity} onCloseModal={onCloseModal} />
      </div>
    </>
  );
}

export default AmenitiesForm;
