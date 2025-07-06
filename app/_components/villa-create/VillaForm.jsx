import VillaFormClient from '@/app/_components/villa-create/VillaFormClient';

function VillaForm({ locations, amenities }) {
  return (
    <div>
      <h1>Villa Form</h1>
      <VillaFormClient locations={locations} amenities={amenities} />
    </div>
  );
}

export default VillaForm;
