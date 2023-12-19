/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import User from "../../Models/User";

interface ContextValues {
  user?: User | null;
  setActiveUser: (userData: User) => void;
  logout: () => void;
}

const AuthUserContext = React.createContext<ContextValues>({
  user: null,
  setActiveUser: (user: User) => {},
  logout: () => {},
});

export default AuthUserContext;
