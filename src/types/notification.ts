import type { MessageType, WebhookType } from "src/shared";

interface InstanceData {
  idInstance: number;
  wid: string;
  typeInstance: "v3";
}

interface SenderData {
  chatId: string;
  chatName: string;
  chatType: string;
  sender: string;
  senderName: string;
  senderType: string;
  senderContactName: string;
  senderPhoneNumber: number;
}

interface MessageData {
  typeMessage: MessageType;
  extendedTextMessageData?: {
    text: string;
  };
  textMessageData?: {
    textMessage: string;
  };
}

interface NotificationBody {
  chatId?: string;
  typeWebhook: WebhookType;
  instanceData: InstanceData;
  timestamp: number;
  idMessage: string;
  senderData?: SenderData;
  status?: string;
  messageData?: MessageData;
}

export interface NotificationObject {
  receiptId: number;
  body: NotificationBody;
}

export type Notification = NotificationObject | null;
