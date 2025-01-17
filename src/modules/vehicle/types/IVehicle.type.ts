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

export interface IVehicle {
  id: number;
  placa: string;
  tipo: string;
  capacidadAsientos: number;
  asientosDisponibles: number;
  conductor: IDriver;
  creadoEn: string;
  actualizadoEn: string;
}
