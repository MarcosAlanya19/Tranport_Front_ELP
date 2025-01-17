interface IRoute {
  id: number;
  creadoEn: string;
  actualizadoEn: string;
  origen: string;
  destino: string;
  distancia: number;
  precioBase: number;
}

interface IDriver {
  id: number;
  creadoEn: string;
  actualizadoEn: string;
  dni: string;
  nombres: string;
  apellidos: string;
  licencia: string;
  disponible: boolean;
}

interface IClient {
  id: number;
  creadoEn: string;
  actualizadoEn: string;
  dni: string;
  nombres: string;
  apellidos: string;
  email: string;
  telefono: string;
  direccion: string;
}

export enum EJourneyState {
  PENDIENTE = 'PENDIENTE',
  EN_CURSO = 'EN_CURSO',
  COMPLETADO = 'COMPLETADO',
  CANCELADO = 'CANCELADO',
}

export interface IJourney {
  id: number;
  creadoEn: string;
  actualizadoEn: string;
  ruta: IRoute;
  conductor: IDriver;
  cliente: IClient;
  fechaHoraSalida: string;
  fechaHoraLlegadaEstimada: string;
  precioFinal: number;
  estado: EJourneyState;
  ticket: string;
}
