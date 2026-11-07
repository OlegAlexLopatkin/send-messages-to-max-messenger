import { createSlice } from "@reduxjs/toolkit";

import type { RootState } from "./store";

import { ScreenStage } from "src/constants";
import type { ScreenStageType } from "src/types";

export interface AppState {
  stage: ScreenStageType;
}

const initialState: AppState = {
  stage: ScreenStage.CONTACTS,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    nextStage: (state) => {
      if (state.stage === ScreenStage.CONTACTS) {
        state.stage = ScreenStage.PHONE;
        return;
      }

      if (state.stage === ScreenStage.PHONE) {
        state.stage = ScreenStage.CHAT;
      }
    },
    previousStage: (state) => {
      if (state.stage === ScreenStage.CHAT) {
        state.stage = ScreenStage.PHONE;
        return;
      }

      if (state.stage === ScreenStage.PHONE) {
        state.stage = ScreenStage.CONTACTS;
      }
    },
  },
});

export const { nextStage, previousStage } = appSlice.actions;

export const selectIsContactsScreen = (state: RootState) =>
  state.app.stage === ScreenStage.CONTACTS;
export const selectIsPhoneScreen = (state: RootState) =>
  state.app.stage === ScreenStage.PHONE;

export default appSlice.reducer;
