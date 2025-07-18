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
import styles from './locations.module.scss';
import FormButton from '@/app/_components/buttons/FormButton';

export const LocationsFormClient = ({ location, onCloseModal, formType }) => {
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
    <>
      <h2 className={styles.heading2}>
        {formType !== 'edit' ? 'Add A Location' : 'Edit Location'}
      </h2>
      <form
        action={action}
        onSubmit={() => form.handleSubmit()}
        className={[
          styles.form,
          'form',
          formType !== 'edit' ? styles.add : styles.edit,
        ].join(' ')}
      >
        {formErrors.map((error) => (
          <p key={error}>{error}</p>
        ))}

        <form.Field name="location">
          {(field) => {
            return (
              <div className="formGroup">
                <label htmlFor="name">
                  {formType !== 'edit' ? 'Add Location' : 'Edit Location'}
                </label>
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
        <form.Field name="slug">
          {(field) => {
            return (
              <div className="formGroup">
                <label htmlFor="name">Location Slug</label>
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
              <div className="formGroup">
                <label htmlFor="name">Tax Rate</label>
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

        <h3>Top 3 Villas</h3>
        <div className={styles.top3Villas}>
          <form.Field name="top_3_villas" mode="array">
            {(fieldArray) => (
              <>
                {/* Render exactly 3 inputs */}
                {Array.from({ length: 3 }).map((_, i) => (
                  <form.Field key={i} name={`top_3_villas[${i}]`}>
                    {(field) => (
                      <div className="formGroup">
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
              </>
            )}
          </form.Field>
        </div>

        <form.Subscribe
          selector={(formState) => [
            formState.canSubmit,
            formState.isSubmitting,
          ]}
        >
          {([canSubmit, isSubmitting]) => (
            <FormButton
              canSubmit={canSubmit}
              isSubmitting={isSubmitting}
              isEdit={formType === 'edit' ? true : false}
              color="purple"
            />
          )}
        </form.Subscribe>
      </form>
    </>
  );
};
