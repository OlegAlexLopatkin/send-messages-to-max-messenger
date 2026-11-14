import { memo, useCallback } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import {
  formatPhoneNumberIntl,
  isPossiblePhoneNumber,
} from "react-phone-number-input";

import { nextStage, previousStage } from "src/app/app-slice";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { setMessageInputValue, setMessages } from "src/app/chat-slice";
import {
  setChatId,
  setFormattedPhone,
  setPhone,
  setPrevPhone,
} from "src/app/phone-slice";
import { useSendPhoneMutation } from "src/app/api-slice";

import { BsArrowLeftShort } from "react-icons/bs";
import Button from "src/components/ui/button";
import IconButton from "src/components/ui/icon-button";
import PhoneNumberInput from "src/components/ui/phone-number-input";

import {
  AppRoutes,
  SHARED_SEND_PHONE,
  TextErrors,
  ToastIds,
} from "src/constants";

import "react-phone-number-input/style.css";
import "./phone-form.scss";

const PhoneForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { chatId, phone, prevPhone } = useAppSelector((state) => state.phone);
  const { apiTokenInstance, idInstance } = useAppSelector(
    (state) => state.contacts,
  );
  const [sendPhone, { isLoading }] = useSendPhoneMutation({
    fixedCacheKey: SHARED_SEND_PHONE,
  });

  const handleNextButtonClick = async () => {
    const onNextPageNavigation = () => {
      dispatch(nextStage());
      navigate(AppRoutes.CHAT_PAGE);
    };

    if (!phone || !isPossiblePhoneNumber(phone)) {
      if (!phone) {
        toast.error(TextErrors[ToastIds.PHONE_IS_EMPTY], {
          toastId: ToastIds.PHONE_IS_EMPTY,
        });
        return;
      }

      toast.error(TextErrors[ToastIds.INVALID_PHONE_NUMBER], {
        toastId: ToastIds.INVALID_PHONE_NUMBER,
      });
      return;
    }

    const phoneNumber = Number(phone.replace(/\D/, ""));
    if (phoneNumber === prevPhone && !!chatId) {
      onNextPageNavigation();
      return;
    }

    try {
      const { chatId: newChatId, exist } = await sendPhone({
        apiTokenInstance,
        idInstance,
        phoneNumber,
      }).unwrap();
      if (exist) {
        dispatch(setMessages([]));
        dispatch(setMessageInputValue(""));
        dispatch(setChatId(newChatId));
        dispatch(setPrevPhone(phoneNumber));
        dispatch(setFormattedPhone(formatPhoneNumberIntl(`+${phoneNumber}`)));

        onNextPageNavigation();
      } else {
        toast.error(TextErrors[ToastIds.ACCOUNT_DOES_NOT_EXIST], {
          toastId: ToastIds.ACCOUNT_DOES_NOT_EXIST,
        });
      }
    } catch (e: unknown) {
      if (typeof e === "object" && e !== null && "status" in e) {
        if (
          e.status === 400 &&
          "data" in e &&
          typeof e.data === "object" &&
          e.data !== null &&
          "message" in e.data &&
          e.data.message !== "check phone number timeout limit exceeded"
        ) {
          toast.error(TextErrors[ToastIds.INVALID_PHONE_NUMBER], {
            toastId: ToastIds.INVALID_PHONE_NUMBER,
          });
        } else if (e.status === 404) {
          toast.error(TextErrors[ToastIds.INVALID_INSTANCE], {
            toastId: ToastIds.INVALID_INSTANCE,
          });
        } else if (e.status === 401) {
          toast.error(TextErrors[ToastIds.INVALID_API_TOKEN], {
            toastId: ToastIds.INVALID_API_TOKEN,
          });
        } else {
          toast.error(TextErrors[ToastIds.SOMETHING_WENT_WRONG], {
            toastId: ToastIds.SOMETHING_WENT_WRONG,
          });
        }
      } else {
        toast.error(TextErrors[ToastIds.SOMETHING_WENT_WRONG], {
          toastId: ToastIds.SOMETHING_WENT_WRONG,
        });
      }
    }
  };

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

export default memo(PhoneForm);
