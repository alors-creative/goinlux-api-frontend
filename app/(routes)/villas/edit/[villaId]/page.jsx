import VillaEditForm from '@/app/_components/villas/villa-edit/VillaEditForm';
import { getAmenities, getLocations, getVilla } from '@/app/_lib/data-service';

async function page({ params }) {
  const { villaId } = await params;
  const villa = await getVilla(villaId);
  const locations = await getLocations();
  const amenities = await getAmenities();

  return (
    <section>
      <h1>Edit Villa: {villa.name}</h1>
      <div className="edit-form">
        <VillaEditForm
          villa={villa}
          locations={locations}
          amenities={amenities}
        />
      </div>
    </section>
  );
}

export default page;
