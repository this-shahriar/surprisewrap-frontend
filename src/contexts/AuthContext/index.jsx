import { createContext, useState } from "react";
import { useHttp } from "../../hooks/http";
import { ENDPOINTS } from "../../configs/readable";

export const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [authModal, setAuthModal] = useState();
  const [pageMode, setPageMode] = useState("login");
  const { get, post } = useHttp();
  const [authLoader, setAuthLoader] = useState({});

  const onLoginSubmit = async (data) => {
    setAuthLoader((al) => ({ ...al, onLoginSubmit: true }));
    console.log("onLoginSubmit", data);
    const res = await post({ url: ENDPOINTS.login, data });
    if (res) {
      setIsLoggedIn(true);
      setAuthModal();
    }
    setAuthLoader((al) => ({ ...al, onLoginSubmit: false }));
  };

  const onRegistrationSubmit = async (values) => {
    setAuthLoader((al) => ({ ...al, onRegistrationSubmit: true }));
    const { name, email, password } = values;
    const res = await post({
      url: ENDPOINTS.register,
      data: { name, email, password, role: "customer" },
    });
    if (res) {
      setPageMode("login");
    }
    setAuthLoader((al) => ({ ...al, onRegistrationSubmit: false }));
  };

  const onForgetEmailSubmit = async (data) => {
    console.log("onForgetEmailSubmit", data);
  };

  const login = async () => {};
  const logout = async () => {
    setIsLoggedIn(false);
  };

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
        logout,
        authLoader,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
