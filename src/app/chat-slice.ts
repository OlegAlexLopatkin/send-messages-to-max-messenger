import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

import { createAppAsyncThunk } from "./with-types";
import { fetchDelete, fetchGet, fetchPost } from "src/api";
import type { ChatMessage, MessageResponse, Notification } from "src/types";
import {
  API_URL,
  ChatMessageType,
  MessageType,
  TextErrors,
  ToastIds,
  Webhook,
} from "src/constants";
import type { RootState } from "./store";

interface ChatState {
  isLoading: boolean;
  messageInputValue: string;
  messages: ChatMessage[];
}

const initialState: ChatState = {
  isLoading: false,
  messageInputValue: "",
  messages: [],
};

export const sendMessage = createAppAsyncThunk(
  "chat/sendMessage",
  async (_, thunkApi) => {
    const { messageInputValue } = thunkApi.getState().chat;
    if (!messageInputValue.trim()) {
      return;
    }

    const dispatch = thunkApi.dispatch;
    const { idInstance, apiTokenInstance } = thunkApi.getState().contacts;
    const { chatId } = thunkApi.getState().phone;

    try {
      await fetchPost<MessageResponse>(
        `${API_URL}/waInstance${idInstance}/sendMessage/${apiTokenInstance}`,
        {
          chatId: chatId,
          message: messageInputValue.trim(),
        },
        {
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
        },
      );
      dispatch(setMessageInputValue(""));
    } catch (e: unknown) {
      if (e instanceof AxiosError && e.status === 403) {
        toast.error(TextErrors[ToastIds.YOUR_ACCOUNT_IS_SUSPEND], {
          toastId: ToastIds.YOUR_ACCOUNT_IS_SUSPEND,
        });
      } else {
        toast.error(TextErrors[ToastIds.SOMETHING_WENT_WRONG], {
          toastId: ToastIds.SOMETHING_WENT_WRONG,
        });
      }
    }
  },
);

export const getNotification = createAppAsyncThunk(
  "chat/getNotification",
  async (_, thunkApi) => {
    const dispatch = thunkApi.dispatch;
    const { idInstance, apiTokenInstance } = thunkApi.getState().contacts;

    const addMessage = (message: ChatMessage) => {
      const messages = thunkApi.getState().chat.messages;
      const isMessageExist = !!messages.find(({ id }) => id === message.id);
      if (isMessageExist) {
        return;
      }
      dispatch(setMessages([...messages, message]));
    };

    try {
      const data = await fetchGet<Notification>(
        `${API_URL}/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`,
      );

      if (data) {
        const { body, receiptId } = data;

        if (
          body.typeWebhook === Webhook.INCOMING_MESSAGE_RECEIVED &&
          body.messageData?.typeMessage === MessageType.TEXT_MESSAGE
        ) {
          const text = body.messageData.textMessageData?.textMessage ?? "";
          const timestamp = body.timestamp * 1000;

          addMessage({
            id: body.idMessage,
            text,
            timestamp,
            type: ChatMessageType.INCOME,
          });
        } else if (
          body.typeWebhook === Webhook.OUTGOING_MESSAGE_RECEIVED &&
          body.messageData?.typeMessage === MessageType.TEXT_MESSAGE
        ) {
          const text = body.messageData.textMessageData?.textMessage ?? "";
          const timestamp = body.timestamp * 1000;
          addMessage({
            id: body.idMessage,
            text,
            timestamp,
            type: ChatMessageType.OUTCOME,
          });
        } else if (
          body.typeWebhook === Webhook.OUTGOING_API_MESSAGE_RECEIVED &&
          body.messageData?.typeMessage === MessageType.EXTENDED_TEXT_MESSAGE
        ) {
          const text = body.messageData.extendedTextMessageData?.text ?? "";
          const timestamp = body.timestamp * 1000;
          addMessage({
            id: body.idMessage,
            text,
            timestamp,
            type: ChatMessageType.OUTCOME,
          });
        }

        await fetchDelete(
          `${API_URL}/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`,
        );
      } else {
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
    } catch {
      toast.error(TextErrors[ToastIds.ERROR_EXECUTING_REQUEST], {
        toastId: ToastIds.ERROR_EXECUTING_REQUEST,
      });
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  },
);

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setMessageInputValue(state, action: PayloadAction<string>) {
      state.messageInputValue = action.payload;
    },
    setMessages(state, action: PayloadAction<ChatMessage[]>) {
      state.messages = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendMessage.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(sendMessage.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setMessageInputValue, setMessages } = chatSlice.actions;

export const selectIsChatLoading = (state: RootState) => state.chat.isLoading;

export default chatSlice.reducer;
