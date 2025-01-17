import { baseAxios } from '../../../api';

export interface IdeleteRouteByIdService {
  routeId: number;
}

export const deleteRouteByIdService = ({ routeId }: IdeleteRouteByIdService) => baseAxios.post<void>(`/rutas/${routeId}/delete`);
