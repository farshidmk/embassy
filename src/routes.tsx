import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "hooks/useAuth";
import Dashboard from "components/dashboard/Dashboard";
import LoginPage from "components/login/LoginPage";
import Layout from "components/layout/Layout";

import NotFound from "components/errorPages/notFound/NotFound";
import Profile from "components/profile/Profile";
import Classes from "pages/classes/Classes";
import Users from "pages/users/Users";
import CrudUser from "pages/users/CrudUser";
import Clubs from "pages/clubs/Clubs";
import CrudClub from "pages/clubs/CrudClub";
import CrudClass from "pages/classes/CrudClass";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/classes">
          <Route index element={<Classes />} />
          <Route path=":classId" element={<CrudClass />} />
          <Route path="new" element={<CrudClass />} />
        </Route>
        <Route path="/users">
          <Route index element={<Users />} />
          <Route path="new" element={<CrudUser />} />
          <Route path=":userId" element={<CrudUser />} />
        </Route>
        <Route path="/clubs">
          <Route index element={<Clubs />} />
          <Route path="new" element={<CrudClub />} />
          <Route path=":clubId" element={<CrudClub />} />
        </Route>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="dashboard" index element={<Dashboard />} />
        <Route path="user">
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="login" index element={<LoginPage />} />
      <Route path="*" element={<Navigate to="login" />} />
    </Routes>
  );
};

export default AppRoutes;

type ProtectedRouteProps = {
  redirectPath?: string;
  children?: React.ReactElement;
};
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ redirectPath = "/login", children }) => {
  const Auth = useAuth();
  if (!Auth?.isUserLoggedIn) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Layout>{children ? children : <Outlet />}</Layout>;
};
