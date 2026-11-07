import type { FC } from "react";
import { Navigate } from "react-router";

import type { ProtectedRouteProps } from "./protected-route.props";
import { AppRoutes } from "src/constants";

const ProtectedRoute: FC<ProtectedRouteProps> = ({
  children,
  isAuthenticated,
}) => {
  if (!isAuthenticated) {
    return <Navigate to={AppRoutes.MAIN_PAGE} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
