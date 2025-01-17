import React from 'react';

import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { tokenService } from '../../../services/tokenService';
import { IloginServicePayload, loginService } from '../services/loginService';
import { IregisterServicePayload, registerService } from '../services/registerService';

export const useAuth = () => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const navigate = useNavigate();

  const login = async ({ payload }: { payload: IloginServicePayload }) => {
    setLoading(true);
    setError(null);
    try {
      const response = await loginService({ payload });
      const { token, name } = response.data;

      tokenService.setToken(token);
      tokenService.setName(name);
      toast.success('Sesión iniciada con éxito.', {
        position: 'top-right',
      });
      navigate('/');
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        const message = err.response?.data.message || 'Error al iniciar sesión. Verifica tus credenciales.';
        setError(message);
      } else {
        setError('Error al iniciar sesión. Verifica tus credenciales.');
      }
    } finally {
      setLoading(false);
    }
  };

  const register = async ({ payload }: { payload: IregisterServicePayload }) => {
    setLoading(true);
    setError(null);
    try {
      await registerService({ payload });
      toast.success('Usuario registrado con éxito. Ahora puedes iniciar sesión.', {
        position: 'top-right',
      });
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        setError(`Error al registrar el usuario. Intenta nuevamente. ${err.response?.data.message}`);
      } else {
        setError('Error al registrar el usuario. Intenta nuevamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    tokenService.removeToken();
    navigate('/auth');
  };

  return { login, register, loading, error, logout };
};
