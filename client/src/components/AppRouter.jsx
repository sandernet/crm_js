import { useUserContext as useContext } from "@context/";
import { observer } from "mobx-react-lite";

import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { privateRoutes, publicRoutes } from "../router";

import { LOGIN_ROUTE, PRODUCT_ROUTE } from "../router/constantRouter";
// import Loader from "./UI/Loader/Loader";

const AppRouter = observer(() => {
  const user = useContext();
  console.log("-------AppRouter()------");
  console.log(user.data.isAuth);
  return user.data.isAuth ? (
    <Routes>
      {privateRoutes.map((route) => (
        <Route
          element={route.component}
          path={route.path}
          exact={route.exact}
          key={route.path}
        />
      ))}
      <Route path="*" element={<Navigate to={PRODUCT_ROUTE} />} />
    </Routes>
  ) : (
    <Routes>
      {publicRoutes.map((route) => (
        <Route
          element={route.component}
          path={route.path}
          exact={route.exact}
          key={route.path}
        />
      ))}
      <Route path="*" element={<Navigate to={LOGIN_ROUTE} />} />
    </Routes>
  );
});

export default AppRouter;
