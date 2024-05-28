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
export const saveSale = async (sale: SaleDto): Promise<SaleDto> => {
  try {
    const response = await axiosInstance.post('/sale', sale);
    return response.data;
  } catch (error) {
    console.error('Error saving sale:', error);
    throw error;
  }
};

// Método para obtener todos los productos
export const getSales = async (search?: (string | null), 
                               date?: (Date | null)): Promise<SaleDto[]> => {
  // console.log(page, size, search, date)
  try {
    const formattedDate = date ? date.toISOString().split('T')[0] : null;
    const response = await axiosInstance.get('/sale/sales', {
      params: { search, date: formattedDate }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching sales:', error);
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
export const editSale = async (id: string, stock: SaleDto): Promise<SaleDto> => {
  try {
    const response = await axiosInstance.put(`/stock/stocks/${id}`, stock);
    return response.data;
  } catch (error) {
    console.error(`Error editing stock with id ${id}:`, error);
    throw error;
  }
};
