import { memo, useState } from "react";
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

  const [apiTokenInstanceValue, setApiTokenInstanceValue] =
    useState(apiTokenInstance);
  const [idInstanceValue, setIdInstanceValue] = useState(idInstance);

  const handleNextButtonClick = () => {
    if (!apiTokenInstanceValue.trim() || !idInstanceValue.trim()) {
      if (!apiTokenInstanceValue.trim() && !idInstanceValue.trim()) {
        toast.error(
          TextErrors[ToastIds.API_TOKEN_INSTANCE_AND_ID_INSTANCE_ARE_EMPTY],
          {
            toastId: ToastIds.API_TOKEN_INSTANCE_AND_ID_INSTANCE_ARE_EMPTY,
          },
        );
        return;
      }

      if (!apiTokenInstanceValue.trim()) {
        toast.error(TextErrors[ToastIds.API_TOKEN_INSTANCE_IS_EMPTY], {
          toastId: ToastIds.API_TOKEN_INSTANCE_IS_EMPTY,
        });
        return;
      }

      if (!idInstanceValue.trim()) {
        toast.error(TextErrors[ToastIds.ID_INSTANCE_IS_EMPTY], {
          toastId: ToastIds.ID_INSTANCE_IS_EMPTY,
        });
        return;
      }
    }
    dispatch(setIdInstance(idInstanceValue.trim()));
    dispatch(setApiTokenInstance(apiTokenInstanceValue.trim()));
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
          value={idInstanceValue}
          onChange={setIdInstanceValue}
        />

        <Input
          id="apiTokenInstance"
          name="apiTokenInstance"
          placeholder="apiTokenInstance"
          required
          type="text"
          value={apiTokenInstanceValue}
          onChange={setApiTokenInstanceValue}
        />

        <Button label="Дальше" onClick={handleNextButtonClick} />
      </div>
    </form>
  );
};

export default memo(ContactsForm);
