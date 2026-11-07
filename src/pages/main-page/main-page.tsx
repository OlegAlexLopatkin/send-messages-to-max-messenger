import { memo } from "react";

import { selectIsContactsScreen, selectIsPhoneScreen } from "src/app/app-slice";
import { useAppSelector } from "src/app/hooks";

import ContactsForm from "src/pages/main-page/components/contacts-form";
import Loader from "src/components/common/loader";
import PhoneForm from "src/pages/main-page/components/phone-form";

import "./main-page.scss";

const MainPage = () => {
  const isContactsScreen = useAppSelector(selectIsContactsScreen);
  const isLoading = useAppSelector((state) => state.phone.isLoading);
  const isPhoneScreen = useAppSelector(selectIsPhoneScreen);

  return (
    <div className="main-age">
      {isContactsScreen && <ContactsForm />}
      {isPhoneScreen && <PhoneForm />}
      {isLoading && <Loader />}
    </div>
  );
};

export default memo(MainPage);
