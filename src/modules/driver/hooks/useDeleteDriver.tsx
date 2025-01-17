import { deleteDriverByIdService, IdeleteDriverByIdService } from '../services/deleteDriverByIdService';

export const useDeleteDriver = () => {
  const handleDriver = async (props: IdeleteDriverByIdService) => {
    return await deleteDriverByIdService(props);
  };

  return {
    handle: handleDriver,
  };
};
