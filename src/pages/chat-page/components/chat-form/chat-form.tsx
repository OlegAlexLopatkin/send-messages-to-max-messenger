import { type ChangeEvent, memo, useCallback } from "react";
import { toast } from "react-toastify";

import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { setMessageInputValue } from "src/app/chat-slice";
import { useSendMessageMutation } from "src/app/api-slice";

import { BsArrowUpShort } from "react-icons/bs";
import IconButton from "src/components/ui/icon-button";

import {
  MAX_MESSAGE_LENGTH,
  SHARED_SEND_MESSAGE,
  TextErrors,
  ToastIds,
} from "src/constants";

import "./chat-form.scss";

const ChatForm = () => {
  const dispatch = useAppDispatch();
  const [senMessage, { isLoading }] = useSendMessageMutation({
    fixedCacheKey: SHARED_SEND_MESSAGE,
  });
  const { messageInputValue } = useAppSelector((state) => state.chat);
  const { chatId } = useAppSelector((state) => state.phone);
  const { apiTokenInstance, idInstance } = useAppSelector(
    (state) => state.contacts,
  );

  const trimmedMessageInputValue = messageInputValue.trim();

  const handleSendMessageButtonClick = async () => {
    if (!trimmedMessageInputValue) {
      return;
    }

    try {
      await senMessage({
        apiTokenInstance,
        chatId,
        idInstance,
        message: trimmedMessageInputValue,
      }).unwrap();
      dispatch(setMessageInputValue(""));
    } catch (e: unknown) {
      if (
        typeof e === "object" &&
        e !== null &&
        "status" in e &&
        e.status === 403
      ) {
        toast.error(TextErrors[ToastIds.YOUR_ACCOUNT_IS_SUSPEND], {
          toastId: ToastIds.YOUR_ACCOUNT_IS_SUSPEND,
        });
      } else {
        toast.error(TextErrors[ToastIds.SOMETHING_WENT_WRONG], {
          toastId: ToastIds.SOMETHING_WENT_WRONG,
        });
      }
    }
  };

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement, HTMLTextAreaElement>) =>
      dispatch(setMessageInputValue(e.target.value)),
    [dispatch],
  );

  return (
    <form className="chat-form">
      <div className="chat-form__input-wrapper">
        <textarea
          className="chat-form__textarea"
          id="message"
          autoFocus
          maxLength={MAX_MESSAGE_LENGTH}
          name="message"
          value={messageInputValue}
          onChange={handleChange}
        >
          Сообщение
        </textarea>

        <IconButton
          className="chat-form__send-message-button"
          aria-label="Отправить сообщение"
          disabled={isLoading || !trimmedMessageInputValue}
          icon={<BsArrowUpShort color="#ffffff" size={24} />}
          theme="primary"
          type="submit"
          onClick={handleSendMessageButtonClick}
        />
      </div>
    </form>
  );
};

export default memo(ChatForm);
