"use client"
import { useState } from "react";
import Context from "./context";

const ContextProvider = ({ children }: any) => {
  const [user, setUser] = useState<UserDTO | null>(null);

  const updateUser = (newUser: UserDTO) => {
    setUser(newUser);
  }

  const contextValue: ContextValue = {
    user,
    updateUser
  }

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;

}

export default ContextProvider;