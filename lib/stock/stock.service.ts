import axios from 'axios';
import { obtainCookie } from '../auth/auth.server';

// const API_BASE_URL = 'http://localhost:8080/api/v1';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;


// Crear una instancia de axios
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

// Método para obtener todos los productos
export const getStocks = async (page?: number, 
                                size?: number, 
                                search?: (string | null), 
                                date?: (Date | null)): Promise<Page<StockDto>> => {
  try {
    const formattedDate = date ? date.toISOString().split('T')[0] : null;
    const response = await axiosInstance.get('/stock/stocks', {
      params: { page, size, search, date: formattedDate }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching stocks:', error);
    throw error;
  }
};

// Método para editar un producto
export const editStock = async (id: string, stock: StockDto): Promise<StockDto> => {
  try {
    const response = await axiosInstance.put(`/stock/stocks/${id}`, stock);
    return response.data;
  } catch (error) {
    console.error(`Error editing stock with id ${id}:`, error);
    throw error;
  }
};
