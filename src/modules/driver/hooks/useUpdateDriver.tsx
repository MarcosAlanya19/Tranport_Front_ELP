import React from 'react';
import { IupdateDriverByIdService, updateDriverByIdService } from '../services/updateDriverByIdService';

export const useUpdateDriver = () => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleDriver = async (props: IupdateDriverByIdService) => {
    setLoading(true);
    try {
      return await updateDriverByIdService(props);
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
