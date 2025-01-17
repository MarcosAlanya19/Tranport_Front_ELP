import * as yup from 'yup';
import { IOption } from '../../../../components/select-use-form';

export interface IRouteForm {
  origen: IOption;
  destino: IOption;
  distancia: number;
  precioBase: number;
}

export const routeSchema = yup.object().shape({
  origen: yup
    .mixed<IOption>()
    .nullable()
    .required('El origen es obligatorio')
    .typeError('El origen debe ser una opción válida'),
  destino: yup
    .mixed<IOption>()
    .nullable()
    .required('El destino es obligatorio')
    .typeError('El destino debe ser una opción válida'),
  distancia: yup
    .number()
    .required('La distancia es obligatoria')
    .positive('La distancia debe ser un número positivo')
    .integer('La distancia debe ser un número entero'),
  precioBase: yup
    .number()
    .required('El precio base es obligatorio')
    .positive('El precio base debe ser un número positivo')
    .typeError('El precio base debe ser un número válido'),
});
