import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { Resolver, useForm, useWatch } from 'react-hook-form';
import { toast } from 'sonner';
import { InputUseForm } from '../../../../components/input-use-form';
import { SelectUseForm } from '../../../../components/select-use-form';
import { UseFormWrapper } from '../../../../components/use-form-wrapper';
import { WrapperModalForm } from '../../../../components/wrapper-modal-form';
import { EFormType } from '../../../../types/EFormType';
import { useCreateRoute } from '../../hooks/useCreateRoute';
import { useUpdateRoute } from '../../hooks/useUpdateRoute';
import { IupdateRouteServicePayload } from '../../services/updateRouteService';
import { IRoute } from '../../types/IRoute.type';
import { calculateDistanceAndPrice } from '../../utils/calculateDistanceAndPrice';
import { optionsDepartament } from '../../utils/optionsDepartament';
import { IRouteForm, routeSchema } from './index.schema';

interface IProps {
  onClose: () => void;
  active: boolean;
  modalType: EFormType | undefined;
  refresh: () => void;
  selectedVehicle: IRoute | null;
}

const RouteForm: React.FC<IProps> = (props) => {
  const { active, onClose, modalType, refresh, selectedVehicle } = props;
  const isCreate = modalType === EFormType.create;

  const methods = useForm<IRouteForm>({
    resolver: yupResolver(routeSchema) as Resolver<IRouteForm>,
  });

  const onCloseComplete = () => {
    methods.reset();
    onClose();
  };

  const CreateRoute = useCreateRoute();
  const UpdateRoute = useUpdateRoute();

  const origenWatched = useWatch({ control: methods.control, name: 'origen' });
  const destinoWatched = useWatch({ control: methods.control, name: 'destino' });

  const onSubmit: (data: IRouteForm) => Promise<void> = async (data) => {
    const payload: IupdateRouteServicePayload = {
      origen: selectedVehicle?.origen ?? data.origen.value,
      destino: selectedVehicle?.destino ?? data.destino.value,
      distancia: data.distancia,
      precioBase: data.precioBase,
    };

    if (isCreate) {
      await CreateRoute.handle({ payload }).then((res) => {
        if (res) {
          toast.success('Ruta creada con éxito.', {
            position: 'top-right',
          });
          refresh();
          onCloseComplete();
        }
      });
      return;
    }

    await UpdateRoute.handle({ routeId: selectedVehicle?.id, payload }).then((res) => {
      if (res) {
        toast.success('Ruta actualizada con éxito.', {
          position: 'top-right',
        });
        refresh();
        onCloseComplete();
      }
    });
  };

  React.useEffect(() => {
    if (origenWatched && destinoWatched) {
      const { distancia, precioBase } = calculateDistanceAndPrice(origenWatched.value, destinoWatched.value);
      methods.setValue('distancia', distancia);
      methods.setValue('precioBase', precioBase);
    }
  }, [origenWatched?.value, destinoWatched?.value]);

  return (
    <WrapperModalForm
      title={isCreate ? 'Nuevo Ruta' : 'Editar Ruta'}
      closeModal={onCloseComplete}
      openModal={active}
      btnSubmit={{
        text: isCreate ? 'Crear' : 'Guardar',
        onClick: methods.handleSubmit(onSubmit),
      }}
    >
      <UseFormWrapper methods={methods} className='grid gap-4'>
        <SelectUseForm
          name='origen'
          placeholder='Seleccione Origen'
          options={optionsDepartament.filter((option) => option.value !== destinoWatched?.value)}
          defaultValue={selectedVehicle?.origen ? [optionsDepartament.find((option) => option.value === selectedVehicle?.origen)] : undefined}
        />
        <SelectUseForm
          name='destino'
          placeholder='Seleccione Destino'
          options={optionsDepartament.filter((option) => option.value !== origenWatched?.value)}
          defaultValue={selectedVehicle?.destino ? [optionsDepartament.find((option) => option.value === selectedVehicle?.destino)] : undefined}
        />
        <InputUseForm name='distancia' label='Distancia' defaultValue={selectedVehicle?.distancia} />
        <InputUseForm name='precioBase' label='Precio Base' defaultValue={selectedVehicle?.precioBase} />
      </UseFormWrapper>
    </WrapperModalForm>
  );
};

export default RouteForm;
