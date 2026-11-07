import type { FC } from "react";
import classNames from "classnames";

import type { InputProps } from "./input.props";

import "./input.scss";

const Input: FC<InputProps> = ({ className, onChange, ...props }) => {
  const classes = classNames("input", className);

  return (
    <div className={classes}>
      <input
        className="input__input"
        onChange={(e) => onChange(e.target.value)}
        {...props}
      />
    </div>
  );
};

export default Input;
