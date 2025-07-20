import Link from 'next/link';
import styles from './button.module.scss';

function NavButton({ link, color, activeBtn, children }) {
  return (
    <Link
      href={link}
      className={[
        styles.linkBtn,
        styles[color],
        activeBtn ? styles.activeBtn : '',
      ].join(' ')}
    >
      {children}
    </Link>
  );
}

export default NavButton;
