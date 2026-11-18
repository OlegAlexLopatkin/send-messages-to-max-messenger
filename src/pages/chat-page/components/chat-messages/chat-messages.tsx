import { memo, useEffect } from "react";
import classNames from "classnames";
import { toast } from "react-toastify";

import { useGetNotificationQuery } from "src/app/api-slice";
import { addMessage } from "src/app/chat-slice";
import { useAppDispatch, useAppSelector } from "src/app/hooks";

import { TextErrors, ToastIds } from "src/constants";
import { getFormattedTime } from "src/utils";

import "./chat-messages.scss";

const ChatMessages = () => {
  const dispatch = useAppDispatch();
  const messages = useAppSelector((state) => state.chat.messages);
  const { apiTokenInstance, idInstance } = useAppSelector(
    (state) => state.contacts,
  );
  const { currentData, isError } = useGetNotificationQuery(
    {
      apiTokenInstance,
      idInstance,
    },
    {
      pollingInterval: 100,
    },
  );

  useEffect(() => {
    if (currentData) {
      dispatch(addMessage(currentData));
    }
  }, [currentData, dispatch]);

  useEffect(() => {
    if (isError) {
      toast.error(TextErrors[ToastIds.ERROR_EXECUTING_REQUEST], {
        toastId: ToastIds.ERROR_EXECUTING_REQUEST,
      });
    }
  }, [isError]);

  return (
    <div className="chat-messages scrollable">
      {messages.map(({ id, text, timestamp, type }) => {
        return (
          <div
            className={classNames(
              "chat-messages__message",
              `chat-messages__message_${type}`,
            )}
            key={id}
          >
            <span className="chat-messages__message-text">{text}</span>
            <span
              className={classNames(
                "chat-messages__message-time",
                `chat-messages__message-time_${type}`,
              )}
            >
              {getFormattedTime(timestamp)}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default memo(ChatMessages);
