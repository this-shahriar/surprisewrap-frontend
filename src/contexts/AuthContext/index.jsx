import { createContext, useState } from "react";
import { useHttp } from "../../hooks/http";
import { ENDPOINTS } from "../../configs/readable";

export const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [authModal, setAuthModal] = useState();
  const [pageMode, setPageMode] = useState("login");
  const { get, post } = useHttp();

  const onLoginSubmit = async (data) => {
    console.log("onLoginSubmit", data);
    const res = await post({ url: ENDPOINTS.login, data });
    if (res) console.log(res);
  };

  const onRegistrationSubmit = async (values) => {
    const { username, email, password } = values;
    console.log("onRegistrationSubmit", values);
    const res = await post({
      url: ENDPOINTS.login,
      data: { username, email, password },
    });
    if (res) console.log(res);
  };

  const onForgetEmailSubmit = async (data) => {
    console.log("onForgetEmailSubmit", data);
  };

  const login = async () => {};
  const logout = async () => {};

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        pageMode,
        setPageMode,
        authModal,
        setAuthModal,
        onLoginSubmit,
        onRegistrationSubmit,
        onForgetEmailSubmit,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
