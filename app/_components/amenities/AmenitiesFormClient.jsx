// client-component.tsx
'use client';

import { useActionState, useEffect } from 'react';
import { initialFormState } from '@tanstack/react-form/nextjs';
import { useRouter } from 'next/navigation';
import {
  mergeForm,
  useForm,
  useStore,
  useTransform,
} from '@tanstack/react-form';
import someAction from './action';

export const AmenitiesFormClient = ({ amenity, onCloseModal }) => {
  const [state, action] = useActionState(someAction, initialFormState);
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      name: amenity?.name ?? '',
      id: amenity?.id != null ? Number(amenity.id) : 0,
    },
    transform: useTransform((baseForm) => mergeForm(baseForm, state), [state]),
    register: (register) => {
      register('id');
    },
    onSubmit: async ({ formApi }) => {
      if (!amenity?.id) {
        formApi.reset();
      }
    },
  });

  const formErrors = useStore(form.store, (formState) => formState.errors);

  useEffect(() => {
    if (state?.status === 'success') {
      router.refresh();
      onCloseModal?.();
    }
  }, [state, router, onCloseModal]);

  return (
    <form action={action} onSubmit={() => form.handleSubmit()}>
      {formErrors.map((error) => (
        <p key={error}>{error}</p>
      ))}

      <form.Field
        name="name"
        validators={{
          onChange: ({ value }) =>
            value < 1
              ? 'Amenity needs to be more than one character'
              : undefined,
        }}
      >
        {(field) => {
          return (
            <div>
              <input
                name="name"
                type="text"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {field.state.meta.errors.map((error) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          );
        }}
      </form.Field>
      {amenity && (
        <form.Field name="id">
          {(field) => (
            <input
              type="hidden"
              name="id"
              value={field.state.value}
              onChange={(e) => field.handleChange(Number(e.target.value))}
            />
          )}
        </form.Field>
      )}

      <form.Subscribe
        selector={(formState) => [formState.canSubmit, formState.isSubmitting]}
      >
        {([canSubmit, isSubmitting]) => (
          <button type="submit" disabled={!canSubmit}>
            {isSubmitting ? '...' : 'Submit'}
          </button>
        )}
      </form.Subscribe>
    </form>
  );
};
