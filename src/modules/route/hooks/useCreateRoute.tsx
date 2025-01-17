import React from 'react';
import { createRouteService, IcreateRouteService } from '../services/createRouteService';

export const useCreateRoute = () => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleDriver = async (props: IcreateRouteService) => {
    setLoading(true);
    try {
      return await createRouteService(props);
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
