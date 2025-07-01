'use server';

import {
  ServerValidateError,
  createServerValidate,
} from '@tanstack/react-form/nextjs';
import { formOpts } from './shared-code';

const serverValidate = createServerValidate({
  ...formOpts,
  onServerValidate: ({ value }) => {
    if (value.name.length < 1) {
      return 'Server validation: Amenity must be longer than 1 character';
    }
  },
});

export default async function someAction(prev, formData) {
  try {
    const validatedData = await serverValidate(formData);
    validatedData.self_added = true;

    const id = Number(validatedData.id);
    const isEdit = !isNaN(id) && id > 0;

    console.log(isEdit);

    const url = isEdit
      ? `${process.env.NEXT_PUBLIC_GOINLUX_API}/amenities/${Number(
          validatedData?.id,
        )}`
      : `${process.env.NEXT_PUBLIC_GOINLUX_API}/amenities`;

    const method = isEdit ? 'PATCH' : 'POST';

    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: validatedData.name,
        self_added: true,
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
