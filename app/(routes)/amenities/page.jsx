import AmenitiesContext from '@/app/_components/amenities/AmenitiesContext';
import AmenitiesForm from '@/app/_components/amenities/AmenitiesForm';
import Modal from '@/app/_components/modal/Modal';
import { getAmenities } from '@/app/_lib/data-service';

async function page() {
  const amenities = await getAmenities();

  return (
    <section>
      <h1>Amenities</h1>
      <div>
        <AmenitiesForm />
      </div>
      <div className="amenities">
        <AmenitiesContext amenities={amenities} />
      </div>
    </section>
  );
}

export default page;
