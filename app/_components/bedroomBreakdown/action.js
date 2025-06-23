// action.ts
'use server';

// Notice the import path is different from the client
import {
  ServerValidateError,
  createServerValidate,
} from '@tanstack/react-form/nextjs';
import { formOpts } from './shared-code';
import { initialFormState } from '@tanstack/react-form/nextjs';

// Create the server action that will infer the types of the form from `formOpts`
const serverValidate = createServerValidate({
  ...formOpts,
  onServerValidate: ({ value }) => {
    if (value.name < 1) {
      return 'Server validation: Amenity must be longer than 1 character';
    }
  },
});

export default async function someAction(prev, formData) {
  try {
    const validatedData = await serverValidate(formData);
    console.log('validatedData', validatedData);
    // Persist the form data to the database
    // await sql`
    //   INSERT INTO users (name, email, password)
    //   VALUES (${validatedData.name}, ${validatedData.email}, ${validatedData.password})
    // `
  } catch (e) {
    if (e instanceof ServerValidateError) {
      return e.formState;
    }

    // Some other error occurred while validating your form
    throw e;
  }

  // Your form has successfully validated!
}
