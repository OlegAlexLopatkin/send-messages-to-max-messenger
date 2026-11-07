import { useCallback, type ChangeEvent } from "react";

import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { setMessageInputValue, sendMessage } from "src/app/chat-slice";

import { BsArrowUpShort } from "react-icons/bs";
import IconButton from "src/components/ui/icon-button";

import { MAX_MESSAGE_LENGTH } from "src/constants";

import "./chat-form.scss";

const ChatForm = () => {
  const dispatch = useAppDispatch();
  const { isLoading, messageInputValue } = useAppSelector(
    (state) => state.chat,
  );

  const handleSendMessageButtonClick = useCallback(() => {
    dispatch(sendMessage());
  }, [dispatch]);

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
          disabled={isLoading || !messageInputValue.trim()}
          icon={<BsArrowUpShort color="#ffffff" size={24} />}
          theme="primary"
          type="submit"
          onClick={handleSendMessageButtonClick}
        />
      </div>
    </form>
  );
};

export default ChatForm;
