import { Link } from "react-router-dom";
import styles from "./Button.module.scss";
import clsx from "clsx";

export const Button = (props) => {
  const { children, center, onClick, letterSetBtn, ...rest } = props;
  const className = clsx({
    [styles.button]: true,
    [styles.centeredButton]: center,
  });

  if (letterSetBtn) {
    return (
      <Link onClick={onClick} className={className} {...rest}>
        {children}
      </Link>
    );
  }
  // if (onClick && typeof onClick === "function") {
  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  );
  // }
};
