import { deleteVehicleByIdService, IdeleteVehicleByIdService } from '../services/deleteVehicleByIdService';

export const useDeleteVehicle = () => {
  const handleDriver = async (props: IdeleteVehicleByIdService) => {
    return await deleteVehicleByIdService(props);
  };

  return {
    handle: handleDriver,
  };
};
