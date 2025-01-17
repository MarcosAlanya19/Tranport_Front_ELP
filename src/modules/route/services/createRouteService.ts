import { baseAxios } from '../../../api';

export interface IcreateRouteServicePayload {
  origen: string;
  destino: string;
  distancia: number;
  precioBase: number;
}

export interface IcreateRouteService {
  payload: IcreateRouteServicePayload;
}

export const createRouteService = ({ payload }: IcreateRouteService) => {
  return baseAxios.post('/rutas', payload);
};
