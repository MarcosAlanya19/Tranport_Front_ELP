import { baseAxios } from '../../../api';
import { IRoute } from '../types/IRoute.type';

export const getRoutesService = () => {
  return baseAxios.get<IRoute[]>('/rutas');
};
