import { formOptions } from '@tanstack/react-form/nextjs';

// You can pass other form options here
export const formOpts = formOptions({
  defaultValues: {
    name: '',
    self_added: true,
  },
});
