import React from 'react';
import { createDriverService, IcreateDriverService } from '../services/createDriverService';

export const useCreateDriver = () => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleDriver = async (props: IcreateDriverService) => {
    setLoading(true);
    try {
      return await createDriverService(props);
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
