import { Navigate, Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";

import { useAppSelector } from "src/app/hooks";

import ChatPage from "src/pages/chat-page";
import MainPage from "src/pages/main-page";
import ProtectedRoute from "src/components/common/protected-route";

import { AppRoutes } from "src/constants";

const App = () => {
  const chatId = useAppSelector((state) => state.phone.chatId);

  return (
    <>
      <Routes>
        <Route path={AppRoutes.MAIN_PAGE} element={<MainPage />} />
        <Route
          path={AppRoutes.CHAT_PAGE}
          element={
            <ProtectedRoute isAuthenticated={!!chatId}>
              <ChatPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="*"
          element={<Navigate replace to={AppRoutes.MAIN_PAGE} />}
        />
      </Routes>
      <ToastContainer
        autoClose={5000}
        closeOnClick={true}
        hideProgressBar={true}
        limit={3}
        newestOnTop={false}
        pauseOnFocusLoss
        position="top-right"
        theme="light"
      />
    </>
  );
};

export default App;
