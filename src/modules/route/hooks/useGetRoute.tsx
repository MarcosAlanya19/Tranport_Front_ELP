import React from 'react';
import { getRoutesService } from '../services/getRoutesService';
import { IRoute } from '../types/IRoute.type';

export const useGetRoute = () => {
  const [data, setData] = React.useState<IRoute[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleDriver = async () => {
    setLoading(true);
    try {
      const res = await getRoutesService();
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
