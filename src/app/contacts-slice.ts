import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface ContactsState {
  apiTokenInstance: string;
  idInstance: string;
}

const initialState: ContactsState = {
  apiTokenInstance: "",
  idInstance: "",
};

export const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    setApiTokenInstance(state, action: PayloadAction<string>) {
      state.apiTokenInstance = action.payload;
    },
    setIdInstance(state, action: PayloadAction<string>) {
      state.idInstance = action.payload;
    },
  },
});

export const { setApiTokenInstance, setIdInstance } = contactsSlice.actions;

export default contactsSlice.reducer;
