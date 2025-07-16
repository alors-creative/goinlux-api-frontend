'use client';

import AmenitiesForm from '@/app/_components/amenities/AmenitiesForm';
import Modal from '@/app/_components/modal/Modal';
import { deleteAmenity } from '@/app/_lib/data-service';
import { MdDelete, MdEditSquare } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import styles from './amenities.module.scss';

function AmenitiesContext({ amenities }) {
  const router = useRouter();

  const handleDelete = async (id) => {
    await deleteAmenity(id);
    router.refresh();
  };

  return (
    <Modal>
      {amenities.map((amenity) => (
        <div key={amenity.id} className={styles.amenity}>
          <p>{amenity.name}</p>
          <div className={styles.buttons}>
            <Modal.Open opens="edit" withProps={amenity}>
              <button>
                <MdEditSquare />
              </button>
            </Modal.Open>
            <button onClick={() => handleDelete(amenity.id)} className="delete">
              <MdDelete />
            </button>
          </div>
        </div>
      ))}

      <Modal.Window name="edit">
        {({ close, props }) => (
          <AmenitiesForm amenity={props} onCloseModal={close} />
        )}
      </Modal.Window>
    </Modal>
  );
}

export default AmenitiesContext;
