export const ChatMessageType = {
  INCOME: "income",
  OUTCOME: "outcome",
} as const;

export type ChatMessageType =
  (typeof ChatMessageType)[keyof typeof ChatMessageType];
