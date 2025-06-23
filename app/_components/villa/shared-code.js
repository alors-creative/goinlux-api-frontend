import { formOptions } from '@tanstack/react-form/nextjs';

// You can pass other form options here
export const formOpts = formOptions({
  defaultValues: {
    name: '',
    beds: 0,
    baths: 0,
    max_capacity: 0,
    main_image: '',
    description: '',
    starting_price: 0,
    external_villa_id: null,
  },
});
