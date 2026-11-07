export const ToastIds = {
  ACCOUNT_DOES_NOT_EXIST: "account_does_not_exist",
  API_TOKEN_INSTANCE_IS_EMPTY: "api_token_instance_is_empty",
  API_TOKEN_INSTANCE_AND_ID_INSTANCE_ARE_EMPTY:
    "api_token_instance_and_id_instance_are_empty",
  ERROR_EXECUTING_REQUEST: "error_executing_request",
  ID_INSTANCE_IS_EMPTY: "id_instance_is_empty",
  INVALID_API_TOKEN: "invalid_api_token",
  INVALID_INSTANCE: "invalid_instance",
  INVALID_PHONE_NUMBER: "invalid_phone_number",
  PHONE_IS_EMPTY: "phone_is_empty",
  SOMETHING_WENT_WRONG: "something_went_wrong",
  YOUR_ACCOUNT_IS_SUSPEND: "your_account_is_suspended",
};

export const TextErrors = {
  [ToastIds.ACCOUNT_DOES_NOT_EXIST]: "Нет такого аккаунта в MAX.",
  [ToastIds.API_TOKEN_INSTANCE_AND_ID_INSTANCE_ARE_EMPTY]:
    "Заполните idInstance и apiTokenInstance.",
  [ToastIds.API_TOKEN_INSTANCE_IS_EMPTY]: "Заполните apiTokenInstance.",
  [ToastIds.ERROR_EXECUTING_REQUEST]: "Ошибка при выполнении запроса.",
  [ToastIds.ID_INSTANCE_IS_EMPTY]: "Заполните idInstance.",
  [ToastIds.INVALID_API_TOKEN]: "Неверный apiTokenInstance.",
  [ToastIds.INVALID_INSTANCE]: "Неверный idInstance.",
  [ToastIds.INVALID_PHONE_NUMBER]: "Неверный номер телефона.",
  [ToastIds.PHONE_IS_EMPTY]: "Заполните номер телефона.",
  [ToastIds.SOMETHING_WENT_WRONG]: "Ошибка. Попробуйте повторить позже.",
  [ToastIds.YOUR_ACCOUNT_IS_SUSPEND]: `На аккаунте временные ограничения (частичный запрет отправки сообщений). Отправка возможна только на номера, сохранившие Ваш номер у себя в контактах.`,
};
