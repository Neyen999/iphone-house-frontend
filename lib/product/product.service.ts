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

// Método para guardar un producto
export const saveProduct = async (product: ProductDto): Promise<ProductDto> => {
  try {
    const response = await axiosInstance.post('/product', product);
    return response.data;
  } catch (error) {
    console.error('Error saving product:', error);
    throw error;
  }
};

// Método para guardar un producto
export const saveProductAndTester = async (products: ProductDto[]): Promise<ProductDto[]> => {
  try {
    const response = await axiosInstance.post('/product/testerBulk', products);
    return response.data;
  } catch (error) {
    console.error('Error saving product:', error);
    throw error;
  }
};

// Método para obtener todos los productos
export const getProducts = async (search?: (string | null)): Promise<ProductDto[]> => {
  try {
    const response = await axiosInstance.get('/product/products', {
      params: { search }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Método para obtener un solo producto por ID
export const getProductById = async (id: string): Promise<ProductDto> => {
  try {
    const response = await axiosInstance.get(`/product/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    throw error;
  }
};

// Método para editar un producto
export const editProduct = async (product: ProductDto): Promise<ProductDto> => {
  try {
    const response = await axiosInstance.put(`/product/products/${product.id}`, product);
    return response.data;
  } catch (error) {
    console.error(`Error editing product with id ${product.id}:`, error);
    throw error;
  }
};

// Método para eliminar un producto
export const deleteProduct = async (name: string): Promise<ProductDto[]> => {
  try {
    const response = await axiosInstance.delete(`/product/products/${name}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting product with name ${name}:`, error);
    throw error;
  }
};
