import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toast } from "react-toastify";

import { addMessage } from "src/app/chat-slice";

import {
  API_URL,
  ChatMessageType,
  MessageType,
  ScreenStage,
  TextErrors,
  ToastIds,
  Webhook,
} from "src/constants";
import type {
  AccountVerification,
  ChatMessage,
  MessageResponse,
  Notification,
} from "src/types";
import type { RootState } from "./store";
import { getRandomNumber } from "src/utils";

interface GetNotification {
  apiTokenInstance: string;
  idInstance: string;
}

interface SendMessage {
  apiTokenInstance: string;
  chatId: string;
  idInstance: string;
  message: string;
}

interface SendPhone {
  apiTokenInstance: string;
  idInstance: string;
  phoneNumber: number;
}

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getNotification: builder.query<ChatMessage | null, GetNotification>({
      queryFn: async (
        { apiTokenInstance, idInstance },
        { dispatch, getState },
        _extraOptions,
        fetchWithBaseQuery,
      ) => {
        let message: ChatMessage | null = null;

        try {
          const startTime = Date.now();
          const result = await fetchWithBaseQuery(
            `/waInstance${idInstance}/receiveNotification/${apiTokenInstance}?receiveTimeout=30`,
          );

          const { stage } = (getState() as RootState).app;

          if (stage !== ScreenStage.CHAT) {
            return { data: message };
          }

          if (result.error) {
            throw new Error();
          }

          if (result.data) {
            const { body, receiptId } = result.data as Notification;

            if (
              body.typeWebhook === Webhook.INCOMING_MESSAGE_RECEIVED &&
              body.messageData?.typeMessage === MessageType.TEXT_MESSAGE
            ) {
              const text = body.messageData.textMessageData?.textMessage ?? "";
              const timestamp = body.timestamp * 1000;

              message = {
                id: body.idMessage,
                text,
                timestamp,
                type: ChatMessageType.INCOME,
              };
            } else if (
              body.typeWebhook === Webhook.OUTGOING_MESSAGE_RECEIVED &&
              body.messageData?.typeMessage === MessageType.TEXT_MESSAGE
            ) {
              const text = body.messageData.textMessageData?.textMessage ?? "";
              const timestamp = body.timestamp * 1000;

              message = {
                id: body.idMessage,
                text,
                timestamp,
                type: ChatMessageType.OUTCOME,
              };
            } else if (
              body.typeWebhook === Webhook.OUTGOING_API_MESSAGE_RECEIVED &&
              body.messageData?.typeMessage ===
                MessageType.EXTENDED_TEXT_MESSAGE
            ) {
              const text = body.messageData.extendedTextMessageData?.text ?? "";
              const timestamp = body.timestamp * 1000;

              message = {
                id: body.idMessage,
                text,
                timestamp,
                type: ChatMessageType.OUTCOME,
              };
            }

            if (message) {
              dispatch(addMessage(message));
            }

            const deleteRequestResult = await fetchWithBaseQuery({
              url: `/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`,
              method: "DELETE",
            });

            if (deleteRequestResult.error) {
              throw new Error();
            }
          } else {
            const endTime = Date.now();
            if (endTime - startTime < 1000) {
              throw new Error();
            }
          }

          return { data: message };
        } catch {
          toast.error(TextErrors[ToastIds.ERROR_EXECUTING_REQUEST], {
            toastId: ToastIds.ERROR_EXECUTING_REQUEST,
          });
          await new Promise((resolve) =>
            setTimeout(resolve, getRandomNumber(4000, 6000)),
          );
          return {
            error: {
              status: "CUSTOM_ERROR",
              error: TextErrors[ToastIds.ERROR_EXECUTING_REQUEST],
            },
          };
        }
      },
    }),
    sendMessage: builder.mutation<MessageResponse, SendMessage>({
      query: ({ apiTokenInstance, chatId, idInstance, message }) => ({
        url: `/waInstance${idInstance}/sendMessage/${apiTokenInstance}`,
        method: "POST",
        body: {
          chatId: chatId,
          message: message,
        },
      }),
    }),
    sendPhone: builder.mutation<AccountVerification, SendPhone>({
      query: ({ apiTokenInstance, idInstance, phoneNumber }) => ({
        url: `/waInstance${idInstance}/checkAccount/${apiTokenInstance}`,
        method: "POST",
        body: {
          phoneNumber,
        },
      }),
    }),
  }),
});

export const {
  useGetNotificationQuery,
  useSendMessageMutation,
  useSendPhoneMutation,
} = apiSlice;
