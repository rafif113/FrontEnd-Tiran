import React, { useEffect } from "react";
import { Navigate, useNavigate, Route } from "react-router-dom";
import { setAuthorization } from "../helpers/api_helper";
import { useDispatch } from "react-redux";

import { useProfile } from "../Components/Hooks/UserHooks";

import { logoutUser } from "../slices/auth/login/thunk";
import moment from "moment-timezone";

const AuthProtected = (props) => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const { userProfile, loading } = useProfile();

  useEffect(() => {
    const checkTokenExpiration = () => {
      if (userProfile) {
        const jakartaDateTime = moment().tz("Asia/Jakarta");
        const tokenCreatedAt = moment(userProfile.data.token.accessToken.created_at).tz("Asia/Jakarta");
        const expiredMinute = 120;
        // const expiredMinute = userProfile.data.token.accessToken.abilities.expires_in;
        const expirationTime = moment(tokenCreatedAt).add(expiredMinute, "minutes");

        if (jakartaDateTime.isAfter(expirationTime)) {
          alert("Session has expired.");
          dispatch(logoutUser());
          history("/login");
        }
        setAuthorization(userProfile.data.token.plainTextToken);
      } else if (!userProfile && !loading) {
        dispatch(logoutUser());
      }
    };

    checkTokenExpiration();

    const intervalId = setInterval(checkTokenExpiration, 60000);

    return () => clearInterval(intervalId);
  }, [userProfile, loading]);

  if (!userProfile && loading) {
    return <Navigate to={{ pathname: "/login", state: { from: props.location } }} />;
  }

  return <>{props.children}</>;
};

const AccessRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return (
          <>
            <Component {...props} />
          </>
        );
      }}
    />
  );
};

export { AuthProtected, AccessRoute };
