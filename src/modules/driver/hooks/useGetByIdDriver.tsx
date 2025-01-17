import React from 'react';

import { getByIdDriversService, IgetByIdDriversService } from '../services/getByIdDriverService';
import { IDriver } from '../types/IDriver.type';

export const useGetByIdDriver = () => {
  const [data, setData] = React.useState<IDriver>();
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleDriver = async (props: IgetByIdDriversService) => {
    setLoading(true);
    try {
      const res = await getByIdDriversService(props);
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
