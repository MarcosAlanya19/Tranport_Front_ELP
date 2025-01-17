import { baseAxios } from '../../../api';

export interface IdeleteJourneyService {
  journeyId: number;
}

export const deleteJourneyService = ({ journeyId }: IdeleteJourneyService) => baseAxios.post<void>(`/viajes/${journeyId}/delete`);
