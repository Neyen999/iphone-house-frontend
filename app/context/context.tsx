import { createContext, useContext } from "react";

const Context = createContext<ContextValue | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error('useAuth debe ser utilizado dentro de un AuthProvider');
  }
  return context;
}


export default Context;
