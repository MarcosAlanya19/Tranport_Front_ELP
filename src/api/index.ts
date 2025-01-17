import axios from 'axios';
import { tokenService } from '../services/tokenService';
import { toast } from 'sonner';

export const baseAxios = axios.create({
  baseURL: 'http://localhost:8080',
});

// Interceptor para incluir el token en las solicitudes
baseAxios.interceptors.request.use(
  (config) => {
    const token = tokenService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para manejar errores globales
baseAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    // Verifica si el error tiene respuesta y si el código de estado es 401
    if (error.response?.status === 401) {
      tokenService.removeToken();
    }

    // Mostrar un toast con el mensaje de error
    if (error.response?.data?.message) {
      toast.error(error.response.data.message, {
        position: 'top-right',
      });
    } else {
      toast.error('Hubo un error al procesar la solicitud', {
        position: 'top-right',
      });
    }

    return Promise.reject(error);
  }
);
