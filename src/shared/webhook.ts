export const Webhook = {
  INCOMING_MESSAGE_RECEIVED: "incomingMessageReceived",
  INCOMING_MESSAGE_STATUS: "outgoingMessageStatus",
  OUTGOING_API_MESSAGE_RECEIVED: "outgoingAPIMessageReceived",
  OUTGOING_MESSAGE_RECEIVED: "outgoingMessageReceived",
  QUOTA_EXCEEDED: "quotaExceeded",
  STATE_INSTANCE_CHANGED: "stateInstanceChanged",
} as const;

export type WebhookType = (typeof Webhook)[keyof typeof Webhook];
