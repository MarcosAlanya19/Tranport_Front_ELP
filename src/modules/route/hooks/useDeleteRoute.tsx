import { deleteRouteByIdService, IdeleteRouteByIdService } from '../services/deleteRouteByIdService';

export const useDeleteRoute = () => {
  const handleDriver = async (props: IdeleteRouteByIdService) => {
    return await deleteRouteByIdService(props);
  };

  return {
    handle: handleDriver,
  };
};
