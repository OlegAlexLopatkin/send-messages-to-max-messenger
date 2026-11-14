import { memo } from "react";

import { useSendPhoneMutation } from "src/app/api-slice";
import { selectIsContactsScreen, selectIsPhoneScreen } from "src/app/app-slice";
import { useAppSelector } from "src/app/hooks";

import ContactsForm from "src/pages/main-page/components/contacts-form";
import Loader from "src/components/common/loader";
import PhoneForm from "src/pages/main-page/components/phone-form";

import { SHARED_SEND_PHONE } from "src/constants";

import "./main-page.scss";

const MainPage = () => {
  const isContactsScreen = useAppSelector(selectIsContactsScreen);
  const isPhoneScreen = useAppSelector(selectIsPhoneScreen);
  const [, { isLoading }] = useSendPhoneMutation({
    fixedCacheKey: SHARED_SEND_PHONE,
  });

  return (
    <div className="main-age">
      {isContactsScreen && <ContactsForm />}
      {isPhoneScreen && <PhoneForm />}
      {isLoading && <Loader />}
    </div>
  );
};

export default memo(MainPage);
