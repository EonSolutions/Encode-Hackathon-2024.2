"use client";

import UserContext, { User } from "@/app/lib/ctx/userctx";
import { Children } from "@/app/lib/types";
import { useState } from "react";

export const UserProvider = ({ children }: Children) => {
  const [user, setUser] = useState<string>("");

  const login = (walletId: string) => {
    setUser(walletId);
  };

  const logout = () => {
    setUser("");
  };

  return (
    <UserContext.Provider value={{ walletId: user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
