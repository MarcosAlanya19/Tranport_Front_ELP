import React from 'react';
import { getJourneyService } from '../services/getJourneyService';
import { IJourney } from '../types/IJourney.type';

export const useGetJourney = () => {
  const [data, setData] = React.useState<IJourney[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleDriver = async () => {
    setLoading(true);
    try {
      const res = await getJourneyService();
      setData(res.data);
      return res;
    } catch (error) {
      console.error('Error fetching Driver data:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    handle: handleDriver,
    loading,
  };
};
