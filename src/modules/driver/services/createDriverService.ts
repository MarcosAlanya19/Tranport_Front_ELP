import { baseAxios } from '../../../api';

export interface IcreateDriverServicePayload {
  nombres: string;
  apellidos: string;
  dni: string;
  licencia: string;
  vehiculoId: number;
  disponible: boolean;
}

export interface IcreateDriverService {
  payload: IcreateDriverServicePayload;
}

export const createDriverService = ({ payload }: IcreateDriverService) => {
  return baseAxios.post('/conductores', payload);
};
