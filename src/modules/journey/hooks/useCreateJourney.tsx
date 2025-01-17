import React from 'react';
import { createJourneyService, IcreateJourneyService } from '../services/createJourneyService';

export const useCreateJourney = () => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleDriver = async (props: IcreateJourneyService) => {
    setLoading(true);
    try {
      return await createJourneyService(props);
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
