import AmenitiesForm from '@/app/_components/amenities/AmenitiesForm';
import BedroomBreakdownForm from '@/app/_components/bedroomBreakdown/BedroomBreakdownForm';
import VillaForm from '@/app/_components/villa/VillaForm';
import Image from 'next/image';
import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/villas');
}
