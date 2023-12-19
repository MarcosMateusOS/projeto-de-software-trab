/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import User from "../../Models/User";
import AuthUserContext from "./context";

interface ProviderProps {
  children: React.ReactNode;
}

const AuthUserProvider: React.FC<ProviderProps> = ({
  children,
}: ProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const setActiveUser = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthUserContext.Provider value={{ user, setActiveUser, logout }}>
      {children}
    </AuthUserContext.Provider>
  );
};

export default AuthUserProvider;
