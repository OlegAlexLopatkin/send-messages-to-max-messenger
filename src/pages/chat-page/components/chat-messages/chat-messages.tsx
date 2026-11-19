import { memo } from "react";
import classNames from "classnames";

import { useGetNotificationQuery } from "src/app/api-slice";
import { useAppSelector } from "src/app/hooks";

import { getFormattedTime } from "src/utils";

import "./chat-messages.scss";

const ChatMessages = () => {
  const messages = useAppSelector((state) => state.chat.messages);
  const { apiTokenInstance, idInstance } = useAppSelector(
    (state) => state.contacts,
  );

  useGetNotificationQuery(
    {
      apiTokenInstance,
      idInstance,
    },
    {
      pollingInterval: 100,
    },
  );

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
