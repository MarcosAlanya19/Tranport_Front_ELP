import { baseAxios } from '../../../api';

export interface IupdateVehicleServicePayload {
  placa: string;
  tipo: string;
  capacidadAsientos: string;
  asientosDisponibles?: string;
}

export interface IupdateVehicleService {
  vehicleId: number;
  payload: IupdateVehicleServicePayload;
}

export const updateVehicleService = ({ payload, vehicleId }: IupdateVehicleService) => {
  return baseAxios.post(`/vehiculos/${vehicleId}/update`, payload);
};
