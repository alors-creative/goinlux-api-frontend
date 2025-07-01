import Link from "next/link";
import styles from "./button.module.scss";

function LinkButton({ link, color, children }) {
  return (
    <Link href={link} className={[styles.button, styles[color]].join(" ")}>
      {children}
    </Link>
  );
}

export default LinkButton;
