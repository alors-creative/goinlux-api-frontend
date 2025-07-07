import LocationsContext from '@/app/_components/locations/LocationsContext';
import LocationsForm from '@/app/_components/locations/LocationsForm';
import { getLocations } from '@/app/_lib/data-service';

async function page() {
  const locations = await getLocations();
  console.log(locations);

  return (
    <section>
      <h1>Locations</h1>
      <div className="locations">
        <LocationsContext locations={locations} />
      </div>
      <div className="addLocations">
        <LocationsForm />
      </div>
    </section>
  );
}

export default page;
