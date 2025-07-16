'use client';
import Button from '@/app/_components/buttons/Button';
import LocationsForm from '@/app/_components/locations/LocationsForm';
import Modal from '@/app/_components/modal/Modal';
import styles from '@/app/_components/buttons/button.module.scss';

function LocationAddContext() {
  return (
    <Modal>
      <Modal.Open opens="add">
        <button className={[styles.button, styles['pink']].join(' ')}>
          Add A Location
        </button>
      </Modal.Open>

      <Modal.Window name="add">
        {({ close }) => <LocationsForm onCloseModal={close} />}
      </Modal.Window>
    </Modal>
  );
}

export default LocationAddContext;
