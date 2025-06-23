import { formOptions } from '@tanstack/react-form/nextjs';

// You can pass other form options here
export const formOpts = formOptions({
  defaultValues: {
    room_name: '',
    room_item: '',
  },
});
