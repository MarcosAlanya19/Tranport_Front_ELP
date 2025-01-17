import React from 'react';
import { getDriversAvailableService } from '../services/getDriversAvailableService';
import { IDriver } from '../types/IDriver.type';

export const useGetDriversAvailable = () => {
  const [data, setData] = React.useState<IDriver[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleDriver = async () => {
    setLoading(true);
    try {
      const res = await getDriversAvailableService();
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
