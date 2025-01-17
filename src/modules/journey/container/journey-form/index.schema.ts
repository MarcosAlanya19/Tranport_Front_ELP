import * as yup from 'yup';
import { IOption } from '../../../../components/select-use-form';

export interface IJourneyForm {
  rutaId: IOption;
  conductorId: IOption;
  fechaHoraSalida: string;
  fechaHoraLlegadaEstimada: string;

  dni: string;
  nombres: string;
  apellidos: string;
  email: string;
  telefono: string;
  direccion: string;
}

export const journeySchema = yup.object().shape({
  rutaId: yup.mixed<IOption>().nullable().required('La ruta es obligatoria').typeError('La ruta debe ser una opción válida'),
  conductorId: yup.mixed<IOption>().nullable().required('El conductor es obligatorio').typeError('El conductor debe ser una opción válida'),
  fechaHoraSalida: yup
    .string()
    .required('La fecha y hora de salida son obligatorias')
    .matches(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/, 'La fecha y hora de salida deben tener el formato ISO (YYYY-MM-DDTHH:mm)'),
  fechaHoraLlegadaEstimada: yup
    .string()
    .required('La fecha y hora estimada de llegada son obligatorias')
    .matches(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/, 'La fecha y hora estimada de llegada deben tener el formato ISO (YYYY-MM-DDTHH:mm)'),

  dni: yup
    .string()
    .required('El DNI es obligatorio')
    .matches(/^\d{8}$/, 'El DNI debe contener 8 dígitos'),
  nombres: yup.string().required('El nombre es obligatorio').min(2, 'El nombre debe tener al menos 2 caracteres'),
  apellidos: yup.string().required('El apellido es obligatorio').min(2, 'El apellido debe tener al menos 2 caracteres'),
  email: yup.string().required('El email es obligatorio').email('El email debe ser válido'),
  telefono: yup
    .string()
    .required('El teléfono es obligatorio')
    .matches(/^\d{9}$/, 'El teléfono debe contener 9 dígitos'),
  direccion: yup.string().required('La dirección es obligatoria').min(5, 'La dirección debe tener al menos 5 caracteres'),
});
