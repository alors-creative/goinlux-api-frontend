'use client';

import AmenitiesForm from '@/app/_components/amenities/AmenitiesForm';
import { AmenitiesFormClient } from '@/app/_components/amenities/AmenitiesFormClient';
import LinkButton from '@/app/_components/buttons/LinkButton';
import Modal from '@/app/_components/modal/Modal';
import { deleteAmenity, deleteLocation } from '@/app/_lib/data-service';
import { MdDelete, MdEditSquare } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import LocationsForm from '@/app/_components/locations/LocationsForm';
import styles from './locations.module.scss';

function LocationsContext({ locations }) {
  const router = useRouter();

  const handleDelete = async (id) => {
    await deleteLocation(id);
    router.refresh();
  };

  return (
    <Modal>
      {locations.map((location) => (
        <div key={location.id} className={styles.location}>
          <p>{location.location}</p>
          <p>Slug: {location.slug}</p>
          <p>Tax Rate: {location.tax_rate}</p>
          <div className={styles.buttons}>
            <Modal.Open opens="edit" withProps={location}>
              <button>
                <MdEditSquare />
              </button>
            </Modal.Open>
            <button onClick={() => handleDelete(location.id)}>
              <MdDelete />
            </button>
          </div>
        </div>
      ))}

      <Modal.Window name="edit">
        {({ close, props }) => (
          <LocationsForm
            location={props}
            onCloseModal={close}
            formType="edit"
          />
        )}
      </Modal.Window>
    </Modal>
  );
}

export default LocationsContext;
