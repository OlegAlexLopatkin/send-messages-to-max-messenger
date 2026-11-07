import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import {
  formatPhoneNumberIntl,
  isPossiblePhoneNumber,
} from "react-phone-number-input";

import { setMessageInputValue, setMessages } from "./chat-slice";
import { createAppAsyncThunk } from "./with-types";

import { fetchPost } from "src/api";
import { API_URL, TextErrors, ToastIds } from "src/constants";
import type { AccountVerification } from "src/types";

interface PhoneState {
  chatId: string;
  formattedPhone: string;
  isLoading: boolean;
  phone: string | undefined;
  prevPhone: number | undefined;
}

const initialState: PhoneState = {
  chatId: "",
  formattedPhone: "",
  isLoading: false,
  phone: undefined,
  prevPhone: undefined,
};

export const sendPhone = createAppAsyncThunk(
  "phone/sendPhone",
  async (onNextPageNavigation: () => void, thunkApi) => {
    const { apiTokenInstance, idInstance } = thunkApi.getState().contacts;
    const { chatId, phone, prevPhone } = thunkApi.getState().phone;

    if (!phone || !isPossiblePhoneNumber(phone)) {
      if (!phone) {
        toast.error(TextErrors[ToastIds.PHONE_IS_EMPTY], {
          toastId: ToastIds.PHONE_IS_EMPTY,
        });
        return;
      }

      toast.error(TextErrors[ToastIds.INVALID_PHONE_NUMBER], {
        toastId: ToastIds.INVALID_PHONE_NUMBER,
      });
      return;
    }

    const phoneNumber = Number(phone.replace(/\D/, ""));
    if (phoneNumber === prevPhone && !!chatId) {
      onNextPageNavigation();
      return;
    }

    try {
      const { chatId, exist } = await fetchPost<AccountVerification>(
        `${API_URL}/waInstance${idInstance}/checkAccount/${apiTokenInstance}`,
        {
          phoneNumber,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (exist) {
        const dispatch = thunkApi.dispatch;

        dispatch(setMessages([]));
        dispatch(setMessageInputValue(""));
        dispatch(setChatId(chatId));
        dispatch(setPrevPhone(phoneNumber));
        dispatch(setFormattedPhone(formatPhoneNumberIntl(`+${phoneNumber}`)));

        onNextPageNavigation();
      } else {
        toast.error(TextErrors[ToastIds.ACCOUNT_DOES_NOT_EXIST], {
          toastId: ToastIds.ACCOUNT_DOES_NOT_EXIST,
        });
      }
    } catch (e: unknown) {
      if (e instanceof AxiosError) {
        if (
          e.status === 400 &&
          e.response?.data?.message !==
            "check phone number timeout limit exceeded"
        ) {
          toast.error(TextErrors[ToastIds.INVALID_PHONE_NUMBER], {
            toastId: ToastIds.INVALID_PHONE_NUMBER,
          });
        } else if (e.status === 404) {
          toast.error(TextErrors[ToastIds.INVALID_INSTANCE], {
            toastId: ToastIds.INVALID_INSTANCE,
          });
        } else if (e.status === 401) {
          toast.error(TextErrors[ToastIds.INVALID_API_TOKEN], {
            toastId: ToastIds.INVALID_API_TOKEN,
          });
        } else {
          toast.error(TextErrors[ToastIds.SOMETHING_WENT_WRONG], {
            toastId: ToastIds.SOMETHING_WENT_WRONG,
          });
        }
      } else {
        toast.error(TextErrors[ToastIds.SOMETHING_WENT_WRONG], {
          toastId: ToastIds.SOMETHING_WENT_WRONG,
        });
      }
    }
  },
);

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
  extraReducers: (builder) => {
    builder
      .addCase(sendPhone.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendPhone.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(sendPhone.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setChatId, setFormattedPhone, setPhone, setPrevPhone } =
  phoneSlice.actions;

export default phoneSlice.reducer;
