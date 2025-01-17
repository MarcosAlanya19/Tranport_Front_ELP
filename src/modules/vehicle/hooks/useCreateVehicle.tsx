import React from 'react';
import { createVehicleService, IcreateVehicleService } from '../services/createVehicleService';

export const useCreateVehicle = () => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleDriver = async (props: IcreateVehicleService) => {
    setLoading(true);
    try {
      return await createVehicleService(props);
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
