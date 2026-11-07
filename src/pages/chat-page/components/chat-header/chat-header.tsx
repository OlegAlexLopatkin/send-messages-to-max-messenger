import { memo, useCallback } from "react";
import { useNavigate } from "react-router";

import { previousStage } from "src/app/app-slice";
import { selectIsChatLoading } from "src/app/chat-slice";
import { useAppDispatch, useAppSelector } from "src/app/hooks";

import { BsArrowLeftShort } from "react-icons/bs";
import IconButton from "src/components/ui/icon-button";

import { AppRoutes } from "src/constants";

import "./chat-header.scss";

const ChatHeader = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const formattedPhone = useAppSelector((state) => state.phone.formattedPhone);
  const isChatLoading = useAppSelector(selectIsChatLoading);

  const handleButtonClick = useCallback(() => {
    dispatch(previousStage());
    navigate(AppRoutes.MAIN_PAGE);
  }, [dispatch, navigate]);

  return (
    <header className="chat-header">
      <div className="chat-header__info">
        <IconButton
          aria-label="На предыдущую страницу"
          disabled={isChatLoading}
          icon={<BsArrowLeftShort color="rgba(6, 7, 8, 0.84)" size={24} />}
          onClick={handleButtonClick}
        />

        <span className="chat-header__phone">{formattedPhone}</span>
      </div>
    </header>
  );
};

export default memo(ChatHeader);
