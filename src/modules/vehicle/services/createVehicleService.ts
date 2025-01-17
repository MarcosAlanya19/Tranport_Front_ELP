import { baseAxios } from '../../../api';

export interface IcreateVehicleServicePayload {
  placa: string;
  tipo: string;
  capacidadAsientos: string;
}

export interface IcreateVehicleService {
  payload: IcreateVehicleServicePayload;
}

export const createVehicleService = ({ payload }: IcreateVehicleService) => {
  return baseAxios.post('/vehiculos', payload);
};
