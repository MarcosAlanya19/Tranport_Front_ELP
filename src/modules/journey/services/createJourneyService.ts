import { baseAxios } from '../../../api';

interface IClientRequest {
  dni: string;
  nombres: string;
  apellidos: string;
  email: string;
  telefono: string;
  direccion: string;
}

export interface IcreateJourneyServicePayload {
  rutaId: number;
  conductorId: number;
  fechaHoraSalida: string;
  fechaHoraLlegadaEstimada: string;
  clienteRequest: IClientRequest;
}

export interface IcreateJourneyService {
  payload: IcreateJourneyServicePayload;
}

export const createJourneyService = ({ payload }: IcreateJourneyService) => {
  return baseAxios.post('/viajes', payload);
};
