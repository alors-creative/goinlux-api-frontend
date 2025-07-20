import { formOptions } from '@tanstack/react-form/nextjs';

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
    api_id: 1,
    location_id: null,
    amenities: [],
    photos: [],
    rooms: [],
  },
});
