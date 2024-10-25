"use client";

import { UserContextType } from "@/lib/ctx/userctx";
import { Children } from "@/lib/types";
import { useState } from "react";

export const UserProvider = ({ children }: Children) => {
  const [user, setUser] = useState(null);

  const login = (userData: UserContextType) => {
    setUser(userData); // Set user data when a user logs in
  };

  const logout = () => {
    setUser(null); // Clear user data on logout
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
