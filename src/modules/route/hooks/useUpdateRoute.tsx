import React from 'react';
import { IupdateRouteService, updateRouteService } from '../services/updateRouteService';

export const useUpdateRoute = () => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleDriver = async (props: IupdateRouteService) => {
    setLoading(true);
    try {
      return await updateRouteService(props);
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
