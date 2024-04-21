interface ContextValue {
  user: UserDTO | null;
  updateUser: (newUser: UserDTO) => void;
}