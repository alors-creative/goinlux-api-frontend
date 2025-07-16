import styles from './button.module.scss';

function FormButton({ canSubmit, isSubmitting, color }) {
  return (
    <button
      type="submit"
      disabled={!canSubmit}
      className={[styles.button, styles[color]].join(' ')}
    >
      {isSubmitting ? '...' : 'Submit'}
    </button>
  );
}

export default FormButton;
