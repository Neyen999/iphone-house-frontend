import axios from 'axios';
import { createSessionToken, deleteSessionToken, obtainCookie, checkTokenExpiration } from './auth.server';

const API_BASE_URL = 'http://localhost:8080/api/v1';

export const loginUser = async (credentials: LoginRequest): Promise<string> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);

    // Set the token as a cookie

    // Calculate the expiration date for the cookie (one week from now)
    // TODO: Consider improving the date management across
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 7); // Adding 7 days

    createSessionToken("__iphonehouse_varela__", response.data.token, expirationDate);

    return response.data; 
    //return response.data;
  } catch (error) {
    // console.error('Error logging in:', error);
    throw error;
  }
};

export const logoutUser = async () => {
  await deleteSessionToken("__iphonehouse_varela__");
  await deleteSessionToken("__user_data__");
}

export const saveUserRoleCookie = async (): Promise<void> => {
  try {
    // const token = await obtainCookie("session");
    const userData = await getUser();

    const userDataForCookie = {
      id: userData?.id,
      role: userData?.roles[0].name
    }

    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 7); // Adding 7 days

    createSessionToken("__user_data__", JSON.stringify(userDataForCookie), expirationDate);
  } catch (error) {
    console.error('Error saving user role cookie:', error);
    throw error;
  }
};

export const getUser = async (): Promise<UserDTO | undefined> => {
  const token = await obtainCookie("__iphonehouse_varela__");

  if (token !== undefined) {
    const tokenIsExpired = await checkTokenExpiration();
    if (!tokenIsExpired) {
      const axiosHeaders = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
    
      const plainHeaders = Object.fromEntries(Object.entries(axiosHeaders));
    
      const response = await axios.get(`${API_BASE_URL}/user/loggedUser`, {
        headers: plainHeaders
      });
    
      const userData: UserDTO = response.data;
      return userData;
    }
  } else {
    return undefined;
  }

}