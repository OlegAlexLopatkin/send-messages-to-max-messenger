import { memo } from "react";

import { useSendMessageMutation } from "src/app/api-slice";

import ChatForm from "src/pages/chat-page/components/chat-form";
import ChatHeader from "src/pages/chat-page/components/chat-header";
import ChatMessages from "src/pages/chat-page/components/chat-messages";
import Loader from "src/components/common/loader";

import { SHARED_SEND_MESSAGE } from "src/constants";

import "./chat-page.scss";

const ChatPage = () => {
  const [, { isLoading }] = useSendMessageMutation({
    fixedCacheKey: SHARED_SEND_MESSAGE,
  });

  return (
    <div className="chat-page">
      <ChatHeader />
      <ChatMessages />
      <ChatForm />
      {isLoading && <Loader />}
    </div>
  );
};

export default memo(ChatPage);
