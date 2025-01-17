import { deleteJourneyService, IdeleteJourneyService } from '../services/deleteJourneyService';

export const useDeleteJourney = () => {
  const handleDriver = async (props: IdeleteJourneyService) => {
    return await deleteJourneyService(props);
  };

  return {
    handle: handleDriver,
  };
};
