import axios from 'axios';
import { obtainCookie } from '../auth/auth.server';

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
export const getSales = async (page?: (number | null),
                               size?: (number | null),
                               search?: (string | null), 
                               startDate?: (Date | null), 
                               endDate?: (Date | null)): Promise<Page<SaleDto>> => {
  // console.log(page, size, search, date)
  try {
    const formattedStartDate = startDate ? startDate.toISOString().split('T')[0] : null;
    const formattedEndDate = endDate ? endDate.toISOString().split('T')[0] : null;
    const response = await axiosInstance.get('/sale/sales', {
      params: { page, size, search, startDate: formattedStartDate, endDate: formattedEndDate }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching sales:', error);
    throw error;
  }
};

// Método para editar un producto
export const editSale = async (id: number, stock: SaleDto): Promise<SaleDto> => {
  try {
    const response = await axiosInstance.put(`/sale/sales/${id}`, stock);
    return response.data;
  } catch (error) {
    console.error(`Error editing stock with id ${id}:`, error);
    throw error;
  }
};

// Método para editar un producto
export const deleteSale = async (id: number): Promise<SaleDto> => {
  try {
    const response = await axiosInstance.delete(`/sale/sales/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting sale with id ${id}:`, error);
    throw error;
  }
};