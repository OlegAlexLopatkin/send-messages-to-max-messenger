import {
  type Action,
  type ThunkAction,
  configureStore,
} from "@reduxjs/toolkit";

import { apiSlice } from "./api-slice";
import appReducer from "./app-slice";
import chatReducer from "./chat-slice";
import contactsReducer from "./contacts-slice";
import phoneReducer from "./phone-slice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    app: appReducer,
    chat: chatReducer,
    contacts: contactsReducer,
    phone: phoneReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk = ThunkAction<void, RootState, unknown, Action>;
