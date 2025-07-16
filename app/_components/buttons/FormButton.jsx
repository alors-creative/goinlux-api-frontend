import styles from './button.module.scss';

function FormButton({ canSubmit, isSubmitting, isEdit, color }) {
  const btnText = isEdit ? 'Update' : 'Add';

  return (
    <button
      type="submit"
      disabled={!canSubmit}
      className={[styles.button, styles[color]].join(' ')}
    >
      {isSubmitting ? '...' : btnText}
    </button>
  );
}

export default FormButton;
