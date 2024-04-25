"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Context from "./context";
import { logoutUser } from "@/lib/auth.service";
import { checkTokenExpiration, obtainCookie } from "@/lib/auth.server";

const ContextProvider = ({ children }: any) => {
  const router = useRouter();

  const [user, setUser] = useState<UserDTO | null>(null);
  const [isTokenExpired, setIsTokenExpired] = useState<boolean>(false);
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    console.log("Context provider render");

    const handleUser = async () => {
      const userFromCookie = await obtainCookie("userData");
      if (userFromCookie !== undefined) {
        console.log("USER FROM COOKIE: ", userFromCookie)
        const parsedUser = JSON.parse(userFromCookie);
        // updateUser(parsedUser);
        setUser(parsedUser);
      }
    }
    handleUser();
  }, []);

  // useEffect(() => {
  //   console.log("USER AFTER USE EFFECT: ", user);
  // }, [])

  const updateUser = (newUser: UserDTO) => {
    console.log("NEW USER VALUE: ", newUser);
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

  const contextValue: ContextValue = {
    user,
    setUser,
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