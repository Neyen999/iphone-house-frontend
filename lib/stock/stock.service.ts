import axios from 'axios';
import { obtainCookie } from '../auth.server';

const API_BASE_URL = 'http://localhost:8080/api/v1';

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

// // Método para guardar un producto
// export const saveSto = async (product: ProductDto): Promise<ProductDto> => {
//   try {
//     const response = await axiosInstance.post('/product', product);
//     return response.data;
//   } catch (error) {
//     console.error('Error saving product:', error);
//     throw error;
//   }
// };

// Método para obtener todos los productos
export const getStocks = async (): Promise<StockDto[]> => {
  try {
    const response = await axiosInstance.get('/stock/stocks');
    return response.data;
  } catch (error) {
    console.error('Error fetching stocks:', error);
    throw error;
  }
};

// // Método para obtener un solo producto por ID
// export const getProductById = async (id: string): Promise<ProductDto> => {
//   try {
//     const response = await axiosInstance.get(`/product/${id}`);
//     return response.data;
//   } catch (error) {
//     console.error(`Error fetching product with id ${id}:`, error);
//     throw error;
//   }
// };

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
