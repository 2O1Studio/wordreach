import { Link } from "react-router-dom";
import styles from "./Button.module.scss";
import clsx from "clsx";

export const Button = (props) => {
  const { children, center, onClick, isButton, ...rest } = props;
  const className = clsx({
    [styles.button]: true,
    [styles.centeredButton]: center,
  });

  if (isButton) {
    return (
      <button
        {...(typeof onClick === "function" ? { onClick: onClick } : {})}
        className={className}
      >
        {children}
      </button>
    );
  }
  return (
    <Link
      {...(typeof onClick === "function" ? { onClick: onClick } : {})}
      className={className}
      {...rest}
    >
      {children}
    </Link>
  );
  // if (onClick && typeof onClick === "function") {
  // }
};
