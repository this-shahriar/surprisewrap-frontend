import { createContext, useState } from "react";
import { useHttp } from "../../hooks/http";
import { ENDPOINTS } from "../../configs/readable";
import { useToast } from "@chakra-ui/react";

export const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [authModal, setAuthModal] = useState();
  const [pageMode, setPageMode] = useState("login");
  const { get, post } = useHttp();
  const [authLoader, setAuthLoader] = useState({});
  const [user, setUser] = useState();
  const toast = useToast();

  const onLoginSubmit = async (data) => {
    setAuthLoader((al) => ({ ...al, onLoginSubmit: true }));
    const res = await post({ url: ENDPOINTS.login, data });
    if (res) {
      setUser(res);
      setIsLoggedIn(true);
      setAuthModal();
      toast({ description: "Logged in successfully.", status: "success" });
    }
    setAuthLoader((al) => ({ ...al, onLoginSubmit: false }));
  };

  const onRegistrationSubmit = async (values) => {
    setAuthLoader((al) => ({ ...al, onRegistrationSubmit: true }));
    const res = await post({
      url: ENDPOINTS.register,
      data: { ...values },
    });
    if (res) {
      setPageMode("login");
    }
    setAuthLoader((al) => ({ ...al, onRegistrationSubmit: false }));
  };

  const onForgetEmailSubmit = async (data) => {
    console.log("onForgetEmailSubmit", data);
  };

  const logout = async () => {
    setIsLoggedIn(false);
    setUser();
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
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
