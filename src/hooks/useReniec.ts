import React from 'react';
import { IreniecService, reniecService } from '../services/reniecService';
import { IReniec } from '../types/IReniec.type';

export const useGetReniec = () => {
  const [data, setData] = React.useState<IReniec>({} as IReniec);
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleReniec = async (props: IreniecService) => {
    setLoading(true);
    try {
      const response = await reniecService(props);
      const data = response.data;
      setData(data);
      return data
    } catch (error) {
      console.error('Error fetching Reniec data:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    handle: handleReniec,
    loading,
  };
};
