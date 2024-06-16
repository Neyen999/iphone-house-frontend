import axios from 'axios';
import { createSessionToken, deleteSessionToken, obtainCookie, checkTokenExpiration } from './auth.server';

// const API_BASE_URL = 'http://localhost:8080/api/v1';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Añadir un interceptor para incluir el token de autorización en cada solicitud
axiosInstance.interceptors.request.use(async (config) => {
  const token = await obtainCookie('__iphonehouse_varela__');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});


export const loginUser = async (credentials: LoginRequest): Promise<string> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
    // Set the token as a cookie
    await saveUserCookies(response);

    return response.data; 
    //return response.data;
  } catch (error) {
    throw error;
  }
};

export const logoutUser = async () => {
  await deleteSessionToken("__iphonehouse_varela__");
  await deleteSessionToken("__user_data__");
}

export const getUser = async (): Promise<UserDTO | undefined> => {
  const token = await obtainCookie("__iphonehouse_varela__");


  if (token !== undefined) {
    const {isValid} = await checkTokenExpiration();
    if (isValid) {
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

export const resetPassword = async (resetPasswordRequest: ResetPasswordDto): Promise<UserDTO | undefined> => {
  try {
    const response = await axiosInstance.put(`${API_BASE_URL}/auth/resetPassword`, resetPasswordRequest);
    
    const userData: UserDTO = response.data;
    return userData;
  } catch (error) {
  }
}

export const extendUserSession = async (): Promise<string | undefined> => {
  try {
    const response = await axiosInstance.post(`${API_BASE_URL}/auth/refreshJwt`);
    await saveUserCookies(response);

    return response.data;
  } catch (error) {
  }

  return undefined;
}

const saveUserCookies = async (response: any) => {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 7); // Adding 7 days

  createSessionToken("__iphonehouse_varela__", response.data.token, expirationDate);
    
  const userData = await getUser();

  const userDataForCookie = {
    id: userData?.id,
    role: userData?.roles[0].name
  }

  expirationDate.setDate(expirationDate.getDate() + 7); // Adding 7 days

  createSessionToken("__user_data__", JSON.stringify(userDataForCookie), expirationDate);

}