import React from 'react';
import { IupdateVehicleService, updateVehicleService } from '../services/updateVehicleService';

export const useUpdateVehicle = () => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleDriver = async (props: IupdateVehicleService) => {
    setLoading(true);
    try {
      return await updateVehicleService(props);
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
