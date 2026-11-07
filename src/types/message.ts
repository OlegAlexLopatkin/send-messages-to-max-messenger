import type { ChatMessageType } from "src/shared";

export interface MessageResponse {
  idMessage: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  timestamp: number;
  type: ChatMessageType;
}
