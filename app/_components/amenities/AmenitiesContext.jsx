'use client';

import AmenitiesForm from '@/app/_components/amenities/AmenitiesForm';
import { AmenitiesFormClient } from '@/app/_components/amenities/AmenitiesFormClient';
import LinkButton from '@/app/_components/buttons/LinkButton';
import Modal from '@/app/_components/modal/Modal';
import { deleteAmenity } from '@/app/_lib/data-service';
import { FaEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import { useRouter } from 'next/navigation';

function AmenitiesContext({ amenities }) {
  const router = useRouter();

  const handleDelete = async (id) => {
    await deleteAmenity(id);
    router.refresh();
  };

  return (
    <Modal>
      {amenities.map((amenity) => (
        <div key={amenity.id}>
          <p>{amenity.name}</p>
          <Modal.Open opens="edit" withProps={amenity}>
            <FaEdit />
          </Modal.Open>
          <button onClick={() => handleDelete(amenity.id)}>
            <MdDeleteForever />
          </button>
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
