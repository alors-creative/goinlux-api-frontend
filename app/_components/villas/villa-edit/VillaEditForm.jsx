import VillaEditFormClient from '@/app/_components/villas/villa-edit/VillaEditFormClient';
import styles from '@/app/_components/villas/villaForms.module.scss';

function VillaEditForm({ villa, locations, amenities }) {
  return (
    <div className={styles.formContainer}>
      <VillaEditFormClient
        villa={villa}
        locations={locations}
        amenities={amenities}
      />
    </div>
  );
}

export default VillaEditForm;
