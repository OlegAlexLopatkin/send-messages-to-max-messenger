import { useEffect } from "react";

import { getNotification, selectIsChatLoading } from "src/app/chat-slice";
import { useAppDispatch, useAppSelector } from "src/app/hooks";

import ChatForm from "src/pages/chat-page/components/chat-form";
import ChatHeader from "src/pages/chat-page/components/chat-header";
import ChatMessages from "src/pages/chat-page/components/chat-messages";
import Loader from "src/components/common/loader";

import "./chat-page.scss";

const ChatPage = () => {
  const dispatch = useAppDispatch();
  const isChatLoading = useAppSelector(selectIsChatLoading);

  useEffect(() => {
    let isMounted = true;
    const getMessages = async () => {
      while (isMounted) {
        await dispatch(getNotification());
      }
    };

    getMessages();

    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  return (
    <div className="chat-page">
      <ChatHeader />
      <ChatMessages />
      <ChatForm />
      {isChatLoading && <Loader />}
    </div>
  );
};

export default ChatPage;
