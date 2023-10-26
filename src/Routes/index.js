import React from "react";
import { Routes, Route } from "react-router-dom";

//Layouts
import NonAuthLayout from "../Layouts/NonAuthLayout";
import VerticalLayout from "../Layouts/index";

//routes
import { authProtectedRoutes, publicRoutes } from "./allRoutes";
import { AuthProtected } from "./AuthProtected";
import { useDispatch, useSelector } from "react-redux";
import { getLoggedinUser } from "../helpers/api_helper";
import { useEffect } from "react";
import { loginSuccess } from "../slices/auth/login/reducer";

const Index = () => {
  const tes = getLoggedinUser();
  const userData = useSelector((state) => state.Login);
  const dispatch = useDispatch();

  useEffect(() => {
    if (tes) {
      // console.log(tes);
      dispatch(loginSuccess(tes.data));
    }
  }, [dispatch]);

  // console.log(userData);

  return (
    <React.Fragment>
      <Routes>
        <Route>
          {publicRoutes.map((route, idx) => (
            <Route path={route.path} element={<NonAuthLayout>{route.component}</NonAuthLayout>} key={idx} exact={true} />
          ))}
        </Route>

        <Route>
          {authProtectedRoutes.map((route, idx) => (
            <Route
              path={route.path}
              element={
                <AuthProtected>
                  <VerticalLayout>{route.component}</VerticalLayout>
                </AuthProtected>
              }
              key={idx}
              exact={true}
            />
          ))}
        </Route>
      </Routes>
    </React.Fragment>
  );
};

export default Index;
