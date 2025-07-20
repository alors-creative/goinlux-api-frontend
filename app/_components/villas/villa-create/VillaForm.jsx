import VillaFormClient from '@/app/_components/villas/villa-create/VillaFormClient';
import styles from '@/app/_components/villas/villaForms.module.scss';

function VillaForm({ locations, amenities }) {
  return (
    <div className={styles.formContainer}>
      <VillaFormClient locations={locations} amenities={amenities} />
    </div>
  );
}

export default VillaForm;
