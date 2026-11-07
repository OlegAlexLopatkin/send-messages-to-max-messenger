import { useCallback } from "react";
import { useNavigate } from "react-router";

import { nextStage, previousStage } from "src/app/app-slice";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { setPhone, sendPhone } from "src/app/phone-slice";

import { BsArrowLeftShort } from "react-icons/bs";
import Button from "src/components/ui/button";
import IconButton from "src/components/ui/icon-button";
import PhoneNumberInput from "src/components/ui/phone-number-input";

import { AppRoutes } from "src/constants";

import "react-phone-number-input/style.css";
import "./phone-form.scss";

const PhoneForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isLoading, phone } = useAppSelector((state) => state.phone);

  const handleNextButtonClick = useCallback(() => {
    const onNextPageNavigation = () => {
      dispatch(nextStage());
      navigate(AppRoutes.CHAT_PAGE);
    };

    dispatch(sendPhone(onNextPageNavigation));
  }, [dispatch, navigate]);

  const handlePreviousPageButtonClick = useCallback(() => {
    dispatch(previousStage());
  }, [dispatch]);

  const handlePhoneInputChange = useCallback(
    (phone: string) => {
      dispatch(setPhone(phone));
    },
    [dispatch],
  );

  return (
    <form className="phone-form">
      <div className="phone-form__wrapper">
        <div className="phone-form__title-wrapper">
          <IconButton
            className="phone-form__icon-button"
            aria-label="На предыдущую страницу"
            disabled={isLoading}
            icon={<BsArrowLeftShort color="rgba(6, 7, 8, 0.84)" size={24} />}
            onClick={handlePreviousPageButtonClick}
          />

          <h1 className="phone-form__title">GREEN-API MAX</h1>
        </div>

        <p className="phone-form__text">Номер телефона собеседника:</p>

        <PhoneNumberInput value={phone} onChange={handlePhoneInputChange} />

        <Button
          disabled={isLoading}
          label="Дальше"
          onClick={handleNextButtonClick}
        />
      </div>
    </form>
  );
};

export default PhoneForm;
