import { memo } from "react";
import classNames from "classnames";

import { useAppSelector } from "src/app/hooks";

import "./chat-messages.scss";

const ChatMessages = () => {
  const messages = useAppSelector((state) => state.chat.messages);

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
              {getTime(timestamp)}
            </span>
          </div>
        );
      })}
    </div>
  );
};

function getTime(timestamp: number) {
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${hours > 9 ? hours : `0${hours}`}:${minutes > 9 ? minutes : `0${minutes}`}`;
}

export default memo(ChatMessages);
