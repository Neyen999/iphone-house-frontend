// auth.service.ts
import axios from 'axios';
// import { cookies } from 'next/headers';
// import { NextRequest } from 'next/server';
// import { isTokenValid } from './auth.server';
// import { cookies } from 'next/headers';
import { createSessionToken, deleteSessionToken } from './auth.server';

const API_BASE_URL = 'http://localhost:8080/api/v1';

export const loginUser = async (credentials: LoginRequest) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);

    // Set the token as a cookie

    // Calculate the expiration date for the cookie (one week from now)
    // TODO: Consider improving the date management across
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 7); // Adding 7 days

    createSessionToken("session", response.data.token, expirationDate);


    // const cuk = cookies().get('token');
    const jsonResponse = Response.json({
      token: response.data,
      status: response.status
    }) 

    // console.log("RESPUESTA JSON: ", jsonResponse)

    return jsonResponse; 
    //return response.data;
  } catch (error) {
    // console.error('Error logging in:', error);
    throw error;
  }
};

export const logoutUser = () => {
  deleteSessionToken("session");
}

// export const checkIsTokenValid = async () => {
//   return await isTokenValid();
// } 