import LocationsContext from '@/app/_components/locations/LocationsContext';
import LocationsForm from '@/app/_components/locations/LocationsForm';
import { getLocations } from '@/app/_lib/data-service';
import styles from './page.module.scss';
import LocationAddContext from '@/app/_components/locations/LocationAddContext';

async function page() {
  const locations = await getLocations();

  return (
    <section>
      <h1>Locations</h1>
      <div className={styles.addLocations}>
        <LocationAddContext />
      </div>
      <div className={styles.locations}>
        <LocationsContext locations={locations} />
      </div>
    </section>
  );
}

export default page;
