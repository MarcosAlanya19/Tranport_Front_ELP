import { baseAxios } from '../../../api';

export interface IdeleteVehicleByIdService {
  vehicleId: number;
}

export const deleteVehicleByIdService = ({ vehicleId: driverId }: IdeleteVehicleByIdService) => baseAxios.post<void>(`/vehiculos/${driverId}/delete`);
