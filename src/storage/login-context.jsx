import React from "react";

const LoginContext = React.createContext({
  sendToken: (token) => {},
  login: () => {},
  logout: () => {},
});

export const LoginContextProvider = (props) => {
  const sendToken = () => {
    const token = window.localStorage.getItem("Authorization");
    return token;
  };

  const loginHandler = (userId) => {
    window.sessionStorage.setItem("userId", userId);
    window.sessionStorage.setItem("isLoggedIn", true);
  };

  const logoutHandler = () => {
    window.localStorage.clear()
    window.sessionStorage.clear()
  };

  const contextValue = {
    sendToken: sendToken,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <LoginContext.Provider value={contextValue}>
      {props.children}
    </LoginContext.Provider>
  );
};

export default LoginContext;
