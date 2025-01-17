import { baseAxios } from '../../../api';
import { IDriver } from '../types/IDriver.type';

export const getDriversService = () => {
  return baseAxios.get<IDriver[]>(`/conductores`);
};
