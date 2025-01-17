import React from 'react';
import { IupdateJourneyService, updateJourneyService } from '../services/updateJourneyService';

export const useUpdateJourney = () => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleDriver = async (props: IupdateJourneyService) => {
    setLoading(true);
    try {
      return await updateJourneyService(props);
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
