import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface ContactsState {
  apiTokenInstance: string;
  idInstance: string;
  prevApiTokenInstance: string;
  prevIdInstance: string;
}

const initialState: ContactsState = {
  apiTokenInstance: "",
  idInstance: "",
  prevApiTokenInstance: "",
  prevIdInstance: "",
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
    setPrevApiTokenInstance(state, action: PayloadAction<string>) {
      state.prevApiTokenInstance = action.payload;
    },
    setPrevIdInstance(state, action: PayloadAction<string>) {
      state.prevIdInstance = action.payload;
    },
  },
});

export const {
  setApiTokenInstance,
  setIdInstance,
  setPrevApiTokenInstance,
  setPrevIdInstance,
} = contactsSlice.actions;

export default contactsSlice.reducer;
