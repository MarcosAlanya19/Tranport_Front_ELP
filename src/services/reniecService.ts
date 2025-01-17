import { baseAxios } from '../api';
import { IReniec } from '../types/IReniec.type';

export interface IreniecService {
  userDni: string | number;
}

export const reniecService = ({ userDni }: IreniecService) => baseAxios.get<IReniec>(`/reniec/dni/${userDni}`);
