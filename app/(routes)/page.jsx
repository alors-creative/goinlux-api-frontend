import AmenitiesForm from '@/app/_components/amenities/AmenitiesForm';
import BedroomBreakdownForm from '@/app/_components/bedroomBreakdown/BedroomBreakdownForm';
import VillaForm from '@/app/_components/villa/VillaForm';
import Image from 'next/image';

export default function Home() {
  return (
    <div>
      <h1>GoinLux Backend - Frontend</h1>

      <AmenitiesForm />
      <BedroomBreakdownForm />
      <VillaForm />
    </div>
  );
}
