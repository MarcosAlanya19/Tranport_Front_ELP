import { baseAxios } from '../../../api';

export interface IupdateDriverByIdServicePayload {
  nombres: string;
  apellidos: string;
  dni: string;
  licencia: string;
  vehiculoId: number;
}

export interface IupdateDriverByIdService {
  driverId: number;
  payload: IupdateDriverByIdServicePayload;
}

export const updateDriverByIdService = ({ driverId, payload }: IupdateDriverByIdService) => baseAxios.post<void>(`/conductores/${driverId}/update`, payload);
