import { IOption } from '../../../components/select-use-form';

export const optionsVehicle = ({ placa }: { placa: string }): IOption[] => [
  { label: `Auto - ${placa}`, value: 'Auto' },
  { label: `Camioneta - ${placa}`, value: 'Camioneta' },
  { label: `Combi - ${placa}`, value: 'Combi' },
  { label: `Miniban - ${placa}`, value: 'Miniban' },
];
