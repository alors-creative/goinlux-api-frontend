import { LocationsFormClient } from '@/app/_components/locations/LocationsFormClient';

function LocationsForm({ location, onCloseModal }) {
  return (
    <>
      <div>
        <LocationsFormClient location={location} onCloseModal={onCloseModal} />
      </div>
    </>
  );
}

export default LocationsForm;
