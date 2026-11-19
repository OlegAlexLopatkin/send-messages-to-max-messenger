# send-messages-to-max-messenger.

Веб-интерфейс для отправки текстовых сообщений в мессенджер MAX с помощью сервиса [GREEN-API](https://green-api.com/max).

## Запуск проекта.

Перед первым запуском проекта необходимо зарегистрироваться в [GREEN-API](https://console.green-api.com/registration). В личном кабинете GREEN-API нужно получить значения `apiUrl`, `idInstance` и `apiTokenInstance`.

В файле `public/config.js` в `window.API_URL` подставить Ваше знаение `apiUrl`.

Потом выполнить команды:

```
yarn install

yarn start
```
