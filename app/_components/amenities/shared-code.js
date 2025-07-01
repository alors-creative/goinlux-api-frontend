// shared-code.ts
import { formOptions } from '@tanstack/react-form/nextjs';

export const formOpts = formOptions({
  defaultValues: {
    name: '',
    id: 0,
    self_added: true,
  },
});
