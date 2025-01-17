import * as yup from 'yup';
import { IOption } from '../../../../components/select-use-form';

export interface IDriverForm {
  nombres: string;
  apellidos: string;
  dni: string;
  licencia: string;
  vehiculo: IOption;
}

export const driverSchema = yup.object<IDriverForm>().shape({
  nombres: yup.string().required('El nombre es obligatorio').max(50, 'Máximo 50 caracteres'),
  apellidos: yup.string().required('Los apellidos son obligatorios').max(100, 'Máximo 50 caracteres'),
  dni: yup.string().required('El DNI es obligatorio').length(8, 'El DNI debe tener exactamente 8 caracteres').matches(/^\d+$/, 'El DNI debe contener solo números'),
  licencia: yup.string().required('La licencia es obligatoria').max(20, 'Máximo 20 caracteres').min(6, 'La licencia debe tener al menos 6 caracteres'),
  vehiculo: yup.mixed<IOption>().nullable().typeError('El vehículo es obligatorio'),
});
