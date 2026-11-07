import type { FC } from "react";

import PhoneInput from "react-phone-number-input";
import ru from "react-phone-number-input/locale/ru";

import type { PhoneNumberInputProps } from "./phone-number-input.props";

import "react-phone-number-input/style.css";
import "./phone-number-input.scss";

const PhoneNumberInput: FC<PhoneNumberInputProps> = ({ value, onChange }) => {
  return (
    <PhoneInput
      className="phone-number-input"
      addInternationalOption={false}
      countries={["RU", "BY"]}
      countryCallingCodeEditable={false}
      defaultCountry="RU"
      international={true}
      labels={ru}
      limitMaxLength={true}
      smartCaret={true}
      value={value}
      onChange={onChange}
    />
  );
};

export default PhoneNumberInput;
