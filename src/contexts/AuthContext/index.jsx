import { createContext, useState } from "react";

export const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [authModal, setAuthModal] = useState();
  const [pageMode, setPageMode] = useState("login");

  const onLoginSubmit = async (data) => {
    console.log("onLoginSubmit", data);
  };

  const onRegistrationSubmit = async (data) => {
    console.log("onRegistrationSubmit", data);
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
