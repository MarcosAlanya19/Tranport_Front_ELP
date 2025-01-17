import { baseAxios } from '../../../api';

export interface IupdateRouteServicePayload {
  origen: string;
  destino: string;
  distancia: number;
  precioBase: number;
}

export interface IupdateRouteService {
  routeId: number;
  payload: IupdateRouteServicePayload;
}

export const updateRouteService = ({ payload, routeId }: IupdateRouteService) => {
  return baseAxios.post(`/rutas/${routeId}/update`, payload);
};
