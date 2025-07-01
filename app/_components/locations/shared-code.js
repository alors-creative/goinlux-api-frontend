// shared-code.ts
import { formOptions } from '@tanstack/react-form/nextjs';

export const formOpts = formOptions({
  defaultValues: {
    id: 0,
    location: '',
    tax_rate: 0,
    slug: '',
  },
});
