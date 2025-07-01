'use client';

import AmenitiesForm from '@/app/_components/amenities/AmenitiesForm';
import { AmenitiesFormClient } from '@/app/_components/amenities/AmenitiesFormClient';
import LinkButton from '@/app/_components/buttons/LinkButton';
import Modal from '@/app/_components/modal/Modal';
import { deleteAmenity, deleteLocation } from '@/app/_lib/data-service';
import { FaEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import LocationsForm from '@/app/_components/locations/LocationsForm';

function LocationsContext({ locations }) {
  const router = useRouter();

  const handleDelete = async (id) => {
    await deleteLocation(id);
    router.refresh();
  };

  return (
    <Modal>
      {locations.map((location) => (
        <div key={location.id}>
          <p>{location.location}</p>
          <p>Slug: {location.slug}</p>
          <p>Tax Rate: {location.tax_rate}</p>
          <Modal.Open opens="edit" withProps={location}>
            <FaEdit />
          </Modal.Open>
          <button onClick={() => handleDelete(location.id)}>
            <MdDeleteForever />
          </button>
        </div>
      ))}

      <Modal.Window name="edit">
        {({ close, props }) => (
          <LocationsForm location={props} onCloseModal={close} />
        )}
      </Modal.Window>
    </Modal>
  );
}

export default LocationsContext;
