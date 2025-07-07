import VillaEditFormClient from '@/app/_components/villa-edit/VillaEditFormClient';

function VillaEditForm({ villa, locations, amenities }) {
  return (
    <div>
      <h1>Villa Form</h1>
      <VillaEditFormClient
        villa={villa}
        locations={locations}
        amenities={amenities}
      />
    </div>
  );
}

export default VillaEditForm;
