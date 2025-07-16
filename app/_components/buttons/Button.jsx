import styles from './button.module.scss';

function Button({ color, children }) {
  return (
    <button className={[styles.button, styles[color]].join(' ')}>
      {children}
    </button>
  );
}

export default Button;
