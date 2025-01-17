import { baseAxios } from '../../../api';
import { IDriver } from '../types/IDriver.type';

export const getDriversAvailableService = () => {
  return baseAxios.get<IDriver[]>(`/conductores/disponibles`);
};
