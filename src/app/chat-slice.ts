import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { ChatMessage } from "src/types";

interface ChatState {
  messageInputValue: string;
  messages: ChatMessage[];
}

const initialState: ChatState = {
  messageInputValue: "",
  messages: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage(state, action: PayloadAction<ChatMessage>) {
      const messages = state.messages;
      const message = action.payload;
      const isMessageNotExist = !messages.find(({ id }) => id === message.id);
      if (isMessageNotExist) {
        state.messages = [...messages, message];
      }
    },
    setMessageInputValue(state, action: PayloadAction<string>) {
      state.messageInputValue = action.payload;
    },
    setMessages(state, action: PayloadAction<ChatMessage[]>) {
      state.messages = action.payload;
    },
  },
});

export const { addMessage, setMessageInputValue, setMessages } =
  chatSlice.actions;

export default chatSlice.reducer;
