import { baseAxios } from '../../../api';
import { IVehicle } from '../types/IVehicle.type';

export const getVehicleService = () => {
  return baseAxios.get<IVehicle[]>('/vehiculos');
};
