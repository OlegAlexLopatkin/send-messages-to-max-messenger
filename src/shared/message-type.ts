export const MessageType = {
  EXTENDED_TEXT_MESSAGE: "extendedTextMessage",
  TEXT_MESSAGE: "textMessage",
} as const;

export type MessageType = (typeof MessageType)[keyof typeof MessageType];
