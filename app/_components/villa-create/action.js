'use server';

import { formOpts } from '@/app/_components/villa-create/shared-code';
import {
  ServerValidateError,
  createServerValidate,
} from '@tanstack/react-form/nextjs';

const serverValidate = createServerValidate({
  ...formOpts,
  onServerValidate: ({ value }) => {
    if (!value.name || value.name.length < 1) {
      return 'Villa name must be at least 1 character';
    }
  },
});

export default async function someAction(prev, formData) {
  try {
    const validatedData = await serverValidate(formData);

    const res = await fetch(`${process.env.NEXT_PUBLIC_GOINLUX_API}/villas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: validatedData.name,
        beds: Number(validatedData.beds),
        baths: Number(validatedData.baths),
        max_capacity: Number(validatedData.max_capacity),
        main_image: validatedData.main_image,
        description: validatedData.description,
        starting_price: Number(validatedData.starting_price) || 0,
        external_villa_id: validatedData.external_villa_id || null,
        api_id: validatedData.api_id ? Number(validatedData.api_id) : null,
        location_id: validatedData.location_id
          ? Number(validatedData.location_id)
          : null,
        amenities: validatedData.amenities || [],
        photos: validatedData.photos || [],
        rooms: validatedData.rooms || [],
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`API error: ${res.status} - ${errorText}`);
    }

    return { status: 'success', value: validatedData };
  } catch (e) {
    if (e instanceof ServerValidateError) {
      return e.formState;
    }
    console.error('Villa create error:', e);
    throw e;
  }
}
