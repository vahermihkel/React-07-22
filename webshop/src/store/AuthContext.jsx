import React from "react";
import { useState } from "react";

                      // null asemel saan kirjutada mis väärtused tal on
                      // kui vajutan muutuja peale punkti
const AuthContext = React.createContext(null);

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const loginHandler = () => {
    setLoggedIn(true);
  }

  const logoutHandler = () => {
    setLoggedIn(false);
  }

  return (
    <AuthContext.Provider value={{
      loggedIn: isLoggedIn,
      login: loginHandler,
      logout: logoutHandler
      }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext;