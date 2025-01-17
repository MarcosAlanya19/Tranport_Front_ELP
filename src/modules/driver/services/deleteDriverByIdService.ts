import { baseAxios } from '../../../api';

export interface IdeleteDriverByIdService {
  driverId: number;
}

export const deleteDriverByIdService = ({ driverId }: IdeleteDriverByIdService) => baseAxios.post<void>(`/conductores/${driverId}/delete`);
