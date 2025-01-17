import { baseAxios } from '../../../api';
import { IJourney } from '../types/IJourney.type';

export const getJourneyService = () => {
  return baseAxios.get<IJourney[]>('/viajes');
};
