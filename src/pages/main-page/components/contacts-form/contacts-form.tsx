import { useCallback } from "react";
import { toast } from "react-toastify";

import { nextStage } from "src/app/app-slice";
import { setApiTokenInstance, setIdInstance } from "src/app/contacts-slice";
import { useAppDispatch, useAppSelector } from "src/app/hooks";

import Button from "src/components/ui/button";
import Input from "src/components/ui/input";

import { TextErrors, ToastIds } from "src/constants";

import "./contacts-form.scss";

const ContactsForm = () => {
  const dispatch = useAppDispatch();

  const { apiTokenInstance, idInstance } = useAppSelector(
    (state) => state.contacts,
  );

  const handleIdInstanceInputChange = useCallback(
    (value: string) => {
      dispatch(setIdInstance(value));
    },
    [dispatch],
  );

  const handleApiTokenInstanceInputChange = useCallback(
    (value: string) => {
      dispatch(setApiTokenInstance(value));
    },
    [dispatch],
  );

  const handleNextButtonClick = () => {
    if (!apiTokenInstance.trim() || !idInstance.trim()) {
      if (!apiTokenInstance.trim() && !idInstance.trim()) {
        toast.error(
          TextErrors[ToastIds.API_TOKEN_INSTANCE_AND_ID_INSTANCE_ARE_EMPTY],
          {
            toastId: ToastIds.API_TOKEN_INSTANCE_AND_ID_INSTANCE_ARE_EMPTY,
          },
        );
        return;
      }

      if (!apiTokenInstance.trim()) {
        toast.error(TextErrors[ToastIds.API_TOKEN_INSTANCE_IS_EMPTY], {
          toastId: ToastIds.API_TOKEN_INSTANCE_IS_EMPTY,
        });
        return;
      }

      if (!idInstance.trim()) {
        toast.error(TextErrors[ToastIds.ID_INSTANCE_IS_EMPTY], {
          toastId: ToastIds.ID_INSTANCE_IS_EMPTY,
        });
        return;
      }
    }

    dispatch(nextStage());
  };

  return (
    <form className="contacts-form">
      <div className="contacts-form__wrapper">
        <h1 className="contacts-form__title">GREEN-API MAX</h1>

        <Input
          id="idInstance"
          autoFocus
          name="idInstance"
          placeholder="idInstance"
          required
          type="text"
          value={idInstance}
          onChange={handleIdInstanceInputChange}
        />

        <Input
          id="apiTokenInstance"
          name="apiTokenInstance"
          placeholder="apiTokenInstance"
          required
          type="text"
          value={apiTokenInstance}
          onChange={handleApiTokenInstanceInputChange}
        />

        <Button label="Дальше" onClick={handleNextButtonClick} />
      </div>
    </form>
  );
};

export default ContactsForm;
