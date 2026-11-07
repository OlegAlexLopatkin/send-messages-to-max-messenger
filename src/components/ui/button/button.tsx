import type { FC } from "react";
import classNames from "classnames";

import type { ButtonProps } from "./button.props";

import "./button.scss";

const Button: FC<ButtonProps> = ({
  className,
  disabled,
  label,
  type = "button",
  ...rest
}) => {
  const classes = classNames("button", className);

  return (
    <button className={classes} disabled={disabled} type={type} {...rest}>
      {label}
    </button>
  );
};

export default Button;
