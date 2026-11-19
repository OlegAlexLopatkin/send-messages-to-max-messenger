import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface PhoneState {
  chatId: string;
  formattedPhone: string;
  phone: string | undefined;
  prevPhone: number | undefined;
}

const initialState: PhoneState = {
  chatId: "",
  formattedPhone: "",
  phone: undefined,
  prevPhone: undefined,
};

const phoneSlice = createSlice({
  name: "phone",
  initialState,
  reducers: {
    setChatId(state, action: PayloadAction<string>) {
      state.chatId = action.payload;
    },
    setFormattedPhone(state, action: PayloadAction<string>) {
      state.formattedPhone = action.payload;
    },
    setPhone(state, action: PayloadAction<string | undefined>) {
      state.phone = action.payload;
    },
    setPrevPhone(state, action: PayloadAction<number | undefined>) {
      state.prevPhone = action.payload;
    },
  },
});

export const { setChatId, setFormattedPhone, setPhone, setPrevPhone } =
  phoneSlice.actions;

export default phoneSlice.reducer;
