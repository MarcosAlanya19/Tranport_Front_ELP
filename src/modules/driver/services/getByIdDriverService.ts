import { baseAxios } from '../../../api';
import { IDriver } from '../types/IDriver.type';

export interface IgetByIdDriversService {
  driverId: number;
}

export const getByIdDriversService = ({ driverId }: IgetByIdDriversService) => {
  return baseAxios.get<IDriver>(`/conductores/${driverId}`);
};
