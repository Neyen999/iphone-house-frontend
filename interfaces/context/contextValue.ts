interface ContextValue {
  user: UserDTO | null;
  // isTokenExpired: boolean;
  isLoggingOut: boolean;
  // isModalOpen: boolean;
  isLoading: boolean;
  isLoggedIn: boolean;
  setIsTokenExpired: (value: boolean) => void;
  setIsLoggingOut: (value: boolean) => void;
  // setIsModalOpen: (value: boolean) => void;
  setUser: (value: UserDTO) => void;
  setIsLoading: (value: boolean) => void;
  setIsLoggedIn: (value: boolean) => void;
  handleLogout: () => Promise<void>;
  // handleModalClose: () => void;
  checkTokenExpiration: () => Promise<TokenExpirationStatus>;
  editingStock: StockDto | null;
  isEditingModalOpen: boolean;
  setIsEditingModalOpen: (value: boolean) => void;
  handleEdit: (value: StockDto | null) => void;
}

interface SaleContextValue {
  user: UserDTO | null;
  isTokenExpired: boolean;
  isLoggingOut: boolean;
  isModalOpen: boolean;
  isLoading: boolean;
  isLoggedIn: boolean;
  setIsTokenExpired: (value: boolean) => void;
  setIsLoggingOut: (value: boolean) => void;
  setIsModalOpen: (value: boolean) => void;
  setUser: (value: UserDTO) => void;
  setIsLoading: (value: boolean) => void;
  setIsLoggedIn: (value: boolean) => void;
  handleLogout: () => Promise<void>;
  handleModalClose: () => void;
  checkTokenExpiration: () => Promise<TokenExpirationStatus>;
  editingStock: StockDto | null;
  isEditingModalOpen: boolean;
  setIsEditingModalOpen: (value: boolean) => void;
  handleEdit: (value: StockDto | null) => void;
}

interface TokenExpirationStatus {
  isAuth: boolean;
  isValid: boolean;
  closeToExpire: boolean;
}