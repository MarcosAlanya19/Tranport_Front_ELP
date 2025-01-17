import { baseAxios } from '../../../api';
import { EJourneyState } from '../types/IJourney.type';

export interface IupdateStatusJourneyService {
  journeyId: number;
  status: EJourneyState;
}

export const updateStatusJourneyService = ({ status, journeyId }: IupdateStatusJourneyService) => {
  return baseAxios.post('/viajes/' + journeyId + '/estado', null, {
    params: {
      nuevoEstado: status,
    },
  });
};
