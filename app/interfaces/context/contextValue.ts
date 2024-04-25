interface ContextValue {
  user: UserDTO | null;
  setUser: (value: UserDTO) => void;
  isTokenExpired: boolean;
  isLoggingOut: boolean;
  isModalOpen: boolean;
  setIsTokenExpired: (value: boolean) => void;
  setIsLoggingOut: (value: boolean) => void;
  setIsModalOpen: (value: boolean) => void;
  handleLogout: () => Promise<void>;
  handleModalClose: () => void;
  checkTokenExpiration: () => Promise<boolean>;
}