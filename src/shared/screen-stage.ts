export const ScreenStage = {
  CHAT: "chat",
  CONTACTS: "contacts",
  PHONE: "phone",
} as const;

export type ScreenStageType = (typeof ScreenStage)[keyof typeof ScreenStage];
