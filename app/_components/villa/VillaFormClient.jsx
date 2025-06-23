// client-component.tsx
'use client';

import { useActionState } from 'react';
import { initialFormState } from '@tanstack/react-form/nextjs';
// Notice the import is from `react-form`, not `react-form/nextjs`
import {
  mergeForm,
  useForm,
  useStore,
  useTransform,
} from '@tanstack/react-form';
import someAction from './action';
import { formOpts } from './shared-code';

export const VillaFormClient = () => {
  const [state, action] = useActionState(someAction, initialFormState);

  const form = useForm({
    ...formOpts,
    transform: useTransform((baseForm) => mergeForm(baseForm, state), [state]),
    onSubmit: async ({ formApi }) => {
      formApi.reset();
    },
  });

  const formErrors = useStore(form.store, (formState) => formState.errors);

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
      <form.Field
        name="beds"
        validators={{
          onChange: ({ value }) =>
            value < 0
              ? 'Amenity needs to be more than one character'
              : undefined,
        }}
      >
        {(field) => {
          return (
            <div>
              <input
                name="beds"
                type="number"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.valueAsNumber)}
              />
              {field.state.meta.errors.map((error) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          );
        }}
      </form.Field>
      <form.Field
        name="baths"
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
                name="baths"
                type="number"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.valueAsNumber)}
              />
              {field.state.meta.errors.map((error) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          );
        }}
      </form.Field>
      <form.Field
        name="max_capacity"
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
                name="max_capacity"
                type="text"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.valueAsNumber)}
              />
              {field.state.meta.errors.map((error) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          );
        }}
      </form.Field>
      <form.Field
        name="main_image"
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
                name="main_image"
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
      <form.Field
        name="description"
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
                name="description"
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
