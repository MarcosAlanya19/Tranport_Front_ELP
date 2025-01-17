import React from 'react';
import { getVehicleNotDriverService } from '../services/getVehicleNotDriverService';
import { IVehicle } from '../types/IVehicle.type';

export const useGetVehicleNotDriver = () => {
  const [data, setData] = React.useState<IVehicle[]>({} as IVehicle[]);
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleDriver = async () => {
    setLoading(true);
    try {
      const res = await getVehicleNotDriverService();
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
