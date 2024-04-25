// auth.service.ts
import axios from 'axios';
// import { cookies } from 'next/headers';
// import { NextRequest } from 'next/server';
// import { isTokenValid } from './auth.server';
// import { cookies } from 'next/headers';
import { createSessionToken, deleteSessionToken, obtainCookie } from './auth.server';

const API_BASE_URL = 'http://localhost:8080/api/v1';

export const loginUser = async (credentials: LoginRequest): Promise<string> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);

    // Set the token as a cookie

    // Calculate the expiration date for the cookie (one week from now)
    // TODO: Consider improving the date management across
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 7); // Adding 7 days

    createSessionToken("session", response.data.token, expirationDate);

    return response.data; 
    //return response.data;
  } catch (error) {
    // console.error('Error logging in:', error);
    throw error;
  }
};

export const logoutUser = () => {
  deleteSessionToken("session");
}

export const saveUserRoleCookie = async (): Promise<void> => {
  try {
    const token = await obtainCookie("session");

    const axiosHeaders = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    const plainHeaders = Object.fromEntries(Object.entries(axiosHeaders));

    const response = await axios.get(`${API_BASE_URL}/user/loggedUser`, {
      headers: plainHeaders
    });

    const userData: UserDTO = response.data;

    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 7); // Adding 7 days

    createSessionToken("userData", JSON.stringify(userData), expirationDate);
  } catch (error) {
    console.error('Error saving user role cookie:', error);
    throw error;
  }
};

// export const getLoggedUser = async (): Promise<UserDTO> => {
//   const token = await obtainCookie("session");

//   console.log("Token de la cookie en getLoggedUser: ", token);

//   const axiosHeaders = {
//     Authorization: `Bearer ${token}`,
//     'Content-Type': 'application/json',
//   };

//   const plainHeaders = Object.fromEntries(Object.entries(axiosHeaders));

//   const response = await axios.get(`${API_BASE_URL}/user/loggedUser`, {
//     headers: plainHeaders
//   })

//   const userData : UserDTO = response.data;

//   const expirationDate = new Date();
//   expirationDate.setDate(expirationDate.getDate() + 7); // Adding 7 days

//   console.log("USER DATA: ", userData);
//   // const userRole = .roles.map((role) => role.name).join(',');
//   createSessionToken("userRole", userData.roles[0].name, expirationDate)

//   console.log("LOGGED USER RESPONSE: ", response.data);
//   return response.data;
// }

export const getUserRoleCookie = async (): Promise<string | undefined> => {
  try {
    return await obtainCookie("userRole");
  } catch (error) {
    console.error('Error getting user role cookie:', error);
    throw error;
  }
};

// export const checkIsTokenValid = async () => {
//   return await isTokenValid();
// } 