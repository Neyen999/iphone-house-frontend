"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import Context from "./context";
import { logoutUser } from "@/lib/auth.service";
import { isAuthenticated, isTokenValid } from "@/lib/auth.server";

const ContextProvider = ({ children }: any) => {
  const router = useRouter();

  const [user, setUser] = useState<UserDTO | null>(null);
  const [isTokenExpired, setIsTokenExpired] = useState<boolean>(false);
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const updateUser = (newUser: UserDTO) => {
    setUser(newUser);
  }

  const handleModalClose = () => {
    console.log("Handle modal close on context provider")
    setIsModalOpen(false);
    setIsLoggingOut(false);
  };

  const handleLogout = async () => {
    console.log("Handle logout on context provider")
    setIsLoggingOut(true);
    logoutUser();

    // redirect
    // handleModalClose();
    router.push("/login");
  }

  const checkTokenExpiration = async () => {
    console.log("Check expiration on context provider")
    const isAuth = await isAuthenticated();
    const isValid = await isTokenValid();
    const tokenExpired = isAuth && !isValid;
    setIsTokenExpired(tokenExpired);
    setIsModalOpen(tokenExpired);
  };

  const contextValue: ContextValue = {
    user,
    updateUser,
    isTokenExpired,
    isLoggingOut,
    isModalOpen,
    setIsTokenExpired,
    setIsLoggingOut,
    setIsModalOpen,
    handleLogout,
    handleModalClose,
    checkTokenExpiration
  }

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;

}

export default ContextProvider;