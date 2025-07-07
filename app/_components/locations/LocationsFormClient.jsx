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

export const LocationsFormClient = ({ location, onCloseModal }) => {
  const [state, action] = useActionState(someAction, initialFormState);
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      id: location?.id != null ? Number(location.id) : 0,
      location: location?.location ?? '',
      tax_rate: location?.tax_rate ?? 0,
      slug: location?.slug ?? '',
      top_3_villas: location?.top_3_villas ?? ['', '', ''],
    },
    transform: useTransform((baseForm) => mergeForm(baseForm, state), [state]),
    register: (register) => {
      register('id');
    },
    onSubmit: async ({ formApi }) => {
      if (!location?.id) {
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
        name="location"
        validators={{
          onChange: ({ value }) =>
            value < 1
              ? 'location needs to be more than one character'
              : undefined,
        }}
      >
        {(field) => {
          return (
            <div>
              <input
                name="location"
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
        name="slug"
        validators={{
          onChange: ({ value }) =>
            value < 1
              ? 'location needs to be more than one character'
              : undefined,
        }}
      >
        {(field) => {
          return (
            <div>
              <input
                name="slug"
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
      <form.Field name="tax_rate">
        {(field) => {
          return (
            <div>
              <input
                name="tax_rate"
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
      {location && (
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

      <h4>Top 3 Villas</h4>
      <form.Field name="top_3_villas" mode="array">
        {(fieldArray) => (
          <div>
            {/* Render exactly 3 inputs */}
            {Array.from({ length: 3 }).map((_, i) => (
              <form.Field key={i} name={`top_3_villas[${i}]`}>
                {(field) => (
                  <div>
                    <input
                      name={`top_3_villas[${i}]`}
                      type="text"
                      placeholder={`Top Villa ${i + 1}`}
                      value={field.state.value || ''}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {/* show validation errors, if any */}
                    {field.state.meta.errors.map((err) => (
                      <p key={err} style={{ color: 'red' }}>
                        {err}
                      </p>
                    ))}
                  </div>
                )}
              </form.Field>
            ))}
          </div>
        )}
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
