import { baseAxios } from '../../../api';
import { IVehicle } from '../types/IVehicle.type';

export const getVehicleNotDriverService = () => {
  return baseAxios.get<IVehicle[]>('/vehiculos/sin-conductor');
};
