import * as yup from 'yup';
import { IOption } from '../../../../components/select-use-form';

export interface IVehicleForm {
  placa: string;
  tipo: IOption;
  capacidadAsientos: string;
  asientosDisponibles?: string;
}

export const vehicleSchema = (validateDisponibles: boolean) =>
  yup.object<IVehicleForm>().shape({
    tipo: yup.mixed<IOption>().nullable().typeError('El tipo es obligatorio'),
    placa: yup.string().required('La placa es obligatoria').max(6, 'La placa no puede exceder 6 caracteres'),
    capacidadAsientos: yup
      .string()
      .required('La capacidad de asientos es obligatoria')
      .matches(/^\d+$/, 'La capacidad debe ser un número entero positivo')
      .test('es-positiva', 'La capacidad de asientos debe ser mayor a cero', (value) => {
        const capacidad = parseInt(value || '0', 10);
        return capacidad > 0;
      }),
    asientosDisponibles: yup
      .string()
      .nullable()
      .when([], {
        is: () => validateDisponibles,
        then: (schema) =>
          schema
            .required('Los asientos disponibles son obligatorios')
            .matches(/^\d+$/, 'Los asientos disponibles deben ser un número entero positivo')
            .test('no-supera-capacidad', 'Los asientos disponibles no pueden exceder la capacidad', function (value) {
              const capacidad = parseInt(this.parent.capacidadAsientos || '0', 10);
              const disponibles = parseInt(value || '0', 10);
              return disponibles <= capacidad;
            }),
        otherwise: (schema) => schema.notRequired(),
      }),
  });
