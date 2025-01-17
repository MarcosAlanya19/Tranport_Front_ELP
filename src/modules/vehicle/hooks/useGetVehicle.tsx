import React from 'react';
import { getVehicleService } from '../services/getVehicleService';
import { IVehicle } from '../types/IVehicle.type';

export const useGetVehicle = () => {
  const [data, setData] = React.useState<IVehicle[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleDriver = async () => {
    setLoading(true);
    try {
      const res = await getVehicleService();
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
