interface LoginRequest {
  username: string;
  password: string;
}

interface ResetPasswordDto {
  oldPassword: string;
  newPassword: string;
}