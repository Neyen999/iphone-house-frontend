interface UserDTO {
  id: number;
  username: string;
  name: string;
  lastName: string;
  roles: RoleDTO[];
  image: string;
}