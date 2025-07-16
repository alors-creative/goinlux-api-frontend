import { AmenitiesFormClient } from '@/app/_components/amenities/AmenitiesFormClient';

function AmenitiesForm({ amenity, onCloseModal, formType }) {
  return (
    <>
      <AmenitiesFormClient
        amenity={amenity}
        onCloseModal={onCloseModal}
        formType={formType}
      />
    </>
  );
}

export default AmenitiesForm;
