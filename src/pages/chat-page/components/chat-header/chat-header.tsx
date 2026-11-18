import { memo, useCallback } from "react";
import { useNavigate } from "react-router";

import { useSendMessageMutation } from "src/app/api-slice";
import { previousStage } from "src/app/app-slice";
import { useAppDispatch, useAppSelector } from "src/app/hooks";

import { BsArrowLeftShort } from "react-icons/bs";
import IconButton from "src/components/ui/icon-button";

import { AppRoutes, SHARED_SEND_MESSAGE } from "src/constants";

import "./chat-header.scss";

const ChatHeader = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const formattedPhone = useAppSelector((state) => state.phone.formattedPhone);
  const [, { isLoading }] = useSendMessageMutation({
    fixedCacheKey: SHARED_SEND_MESSAGE,
  });

  const handleButtonClick = useCallback(() => {
    dispatch(previousStage());
    navigate(AppRoutes.MAIN_PAGE);
  }, [dispatch, navigate]);

  return (
    <header className="chat-header">
      <div className="chat-header__info">
        <IconButton
          aria-label="На предыдущую страницу"
          disabled={isLoading}
          icon={<BsArrowLeftShort className="chat-header__icon" />}
          onClick={handleButtonClick}
        />

        <span className="chat-header__phone">{formattedPhone}</span>
      </div>
    </header>
  );
};

export default memo(ChatHeader);
