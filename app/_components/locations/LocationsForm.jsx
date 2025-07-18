import { LocationsFormClient } from '@/app/_components/locations/LocationsFormClient';

function LocationsForm({ location, onCloseModal, formType }) {
  return (
    <>
      <LocationsFormClient
        location={location}
        onCloseModal={onCloseModal}
        formType={formType}
      />
    </>
  );
}

export default LocationsForm;
