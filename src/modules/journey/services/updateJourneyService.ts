import { baseAxios } from '../../../api';

interface IClientRequest {
  dni: string;
  nombres: string;
  apellidos: string;
  email: string;
  telefono: string;
  direccion: string;
}

export interface IupdateJourneyServicePayload {
  rutaId: number;
  conductorId: number;
  fechaHoraSalida: string;
  fechaHoraLlegadaEstimada: string;
  clienteRequest: IClientRequest;
}

export interface IupdateJourneyService {
  payload: IupdateJourneyServicePayload;
  journeyId: number;
}

export const updateJourneyService = ({ payload, journeyId }: IupdateJourneyService) => {
  return baseAxios.post('/viajes/' + journeyId + '/update', payload);
};
