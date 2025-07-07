'use server';

import {
  ServerValidateError,
  createServerValidate,
} from '@tanstack/react-form/nextjs';
import { formOpts } from './shared-code';

const serverValidate = createServerValidate({
  ...formOpts,
  onServerValidate: ({ value }) => {
    if (value.location.length < 1) {
      return 'Server validation: Amenity must be longer than 1 character';
    }
  },
});

export default async function someAction(prev, formData) {
  try {
    const validatedData = await serverValidate(formData);

    const id = Number(validatedData.id);
    const isEdit = !isNaN(id) && id > 0;

    const rawTopVillas = validatedData.top_3_villas;

    // Convert to array (preserves order by numeric keys)
    const top_3_villas = Object.keys(rawTopVillas)
      .sort((a, b) => Number(a) - Number(b))
      .map((key) => rawTopVillas[key]);

    const url = isEdit
      ? `${process.env.NEXT_PUBLIC_GOINLUX_API}/locations/${Number(
          validatedData?.id,
        )}`
      : `${process.env.NEXT_PUBLIC_GOINLUX_API}/locations`;

    const method = isEdit ? 'PATCH' : 'POST';

    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        location: validatedData.location,
        slug: validatedData.slug,
        tax_rate: Number(validatedData.tax_rate),
        top_3_villas: top_3_villas,
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
    throw e;
  }
}
