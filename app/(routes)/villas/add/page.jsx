import VillaForm from '@/app/_components/villa-create/VillaForm';
import { getAmenities, getLocations } from '@/app/_lib/data-service';

async function page() {
  const locations = await getLocations();
  const amenities = await getAmenities();

  return (
    <section>
      <h1>Add A Villa</h1>

      <VillaForm locations={locations} amenities={amenities} />
    </section>
  );
}

export default page;
