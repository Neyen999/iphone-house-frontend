"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Context from "./context";
import { logoutUser, getUser } from "@/lib/auth/auth.service";
import { checkTokenExpiration } from "@/lib/auth/auth.server";

const ContextProvider = ({ children }: any) => {
  const router = useRouter();

  const [user, setUser] = useState<UserDTO | null>(null);
  const [isTokenExpired, setIsTokenExpired] = useState<boolean>(false);
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);
  // const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [editingStock, setEditingStock] = useState<StockDto | null>(null);
  const [isEditingModalOpen, setIsEditingModalOpen] = useState<boolean>(false);

  const handleEdit = (row: StockDto | null) => {
    setEditingStock(row);
    setIsEditingModalOpen(true);
  };

  useEffect(() => {
    const handleUser = async () => {
      const loggedUser = await getUser();
      if (loggedUser !== undefined) {
        setUser(loggedUser);
        setIsLoading(false); 
      }
    }
    handleUser();
  }, [isLoggedIn]);


  const updateUser = (newUser: UserDTO) => {
    setUser(newUser);
  }

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await logoutUser();

    // redirect
    // Redirigir usando router.push
    router.push("/login");
    // Recargar la página después de la redirección
    window.location.reload();
  }

  const contextValue: ContextValue = {
    user,
    // isTokenExpired,
    isLoggingOut,
    // isModalOpen,
    isLoading,
    isLoggedIn,
    setIsTokenExpired,
    setIsLoggingOut,
    // setIsModalOpen,
    setUser,
    setIsLoading,
    setIsLoggedIn,
    handleLogout,
    // handleModalClose,
    checkTokenExpiration,
    editingStock,
    isEditingModalOpen, 
    setIsEditingModalOpen,
    handleEdit
  }

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;

}

export default ContextProvider;