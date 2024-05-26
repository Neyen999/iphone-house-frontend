"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Context from "./context";
import { logoutUser, getUser } from "@/lib/auth.service";
import { checkTokenExpiration } from "@/lib/auth.server";

const ContextProvider = ({ children }: any) => {
  const router = useRouter();

  const [user, setUser] = useState<UserDTO | null>(null);
  const [isTokenExpired, setIsTokenExpired] = useState<boolean>(false);
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [editingStock, setEditingStock] = useState<StockDto | null>(null);
  const [isEditingModalOpen, setIsEditingModalOpen] = useState<boolean>(false);

  const handleEdit = (row: StockDto | null) => {
    setEditingStock(row);
    setIsEditingModalOpen(true);
  };

  useEffect(() => {
    console.log("Context provider render");

    const handleUser = async () => {
      // setIsLoading(false);
      const loggedUser = await getUser();
      if (loggedUser !== undefined) {
        console.log("LOGGED USER: ", loggedUser)
        // updateUser(parsedUser);
        setUser(loggedUser);
        console.log("AFTER SETTER: ", loggedUser)
        setIsLoading(false); 
      }
    }
    // setTimeout(() => {
      handleUser();
    // }, 1000);
    console.log("IS LOADING VALUE: ", isLoading)
  }, [isLoggedIn]);

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
    await logoutUser();

    // redirect
    // handleModalClose();
    router.push("/login");
  }

  const contextValue: ContextValue = {
    user,
    isTokenExpired,
    isLoggingOut,
    isModalOpen,
    isLoading,
    isLoggedIn,
    setIsTokenExpired,
    setIsLoggingOut,
    setIsModalOpen,
    setUser,
    setIsLoading,
    setIsLoggedIn,
    handleLogout,
    handleModalClose,
    checkTokenExpiration,
    editingStock,
    isEditingModalOpen, 
    setIsEditingModalOpen,
    handleEdit
  }

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;

}

export default ContextProvider;