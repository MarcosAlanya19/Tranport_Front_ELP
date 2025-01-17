import React from 'react';
import { IupdateStatusJourneyService, updateStatusJourneyService } from '../services/updateStatusJourneyService';

export const useUpdateStatusJourney = () => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleDriver = async (props: IupdateStatusJourneyService) => {
    setLoading(true);
    try {
      return await updateStatusJourneyService(props);
    } catch (error) {
      console.error('Error fetching Driver data:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    handle: handleDriver,
    loading,
  };
};
