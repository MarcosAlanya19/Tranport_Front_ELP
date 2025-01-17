import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { Resolver, useForm, useWatch } from 'react-hook-form';
import { toast } from 'sonner';
import { InputUseForm } from '../../../../components/input-use-form';
import { SelectUseForm } from '../../../../components/select-use-form';
import { UseFormWrapper } from '../../../../components/use-form-wrapper';
import { WrapperModalForm } from '../../../../components/wrapper-modal-form';
import { EFormType } from '../../../../types/EFormType';
import { useCreateVehicle } from '../../hooks/useCreateVehicle';
import { useUpdateVehicle } from '../../hooks/useUpdateVehicle';
import { IupdateVehicleServicePayload } from '../../services/updateVehicleService';
import { IVehicle } from '../../types/IVehicle.type';
import { optionsVehicle } from '../../utils/optionsVehicle';
import { IVehicleForm, vehicleSchema } from './index.schema';

interface IProps {
  onClose: () => void;
  active: boolean;
  modalType: EFormType | undefined;
  refresh: () => void;
  selectedVehicle: IVehicle | null;
}

const VehicleForm: React.FC<IProps> = (props) => {
  const { active, onClose, modalType, refresh, selectedVehicle } = props;
  const isCreate = modalType === EFormType.create;

  const methods = useForm<IVehicleForm>({
    resolver: yupResolver(vehicleSchema(!isCreate)) as Resolver<IVehicleForm>,
  });

  const onCloseComplete = () => {
    methods.reset();
    onClose();
  };

  const CreateVehicle = useCreateVehicle();
  const UpdateVehicle = useUpdateVehicle();

  const placaWatched = useWatch({ control: methods.control, name: 'placa' });

  const onSubmit: (data: IVehicleForm) => Promise<void> = async (data) => {
    const payload: IupdateVehicleServicePayload = {
      placa: data.placa,
      tipo: data.tipo.value,
      capacidadAsientos: data.capacidadAsientos,
      asientosDisponibles: data.asientosDisponibles,
    };

    if (isCreate) {
      await CreateVehicle.handle({ payload }).then((res) => {
        if (res) {
          toast.success('Conductor creado con éxito.', {
            position: 'top-right',
          });
          refresh();
          onCloseComplete();
        }
      });
      return;
    }

    await UpdateVehicle.handle({ vehicleId: selectedVehicle?.id, payload }).then((res) => {
      if (res) {
        toast.success('Conductor actualizado con éxito.', {
          position: 'top-right',
        });
        refresh();
        onCloseComplete();
      }
    });
  };

  return (
    <WrapperModalForm
      title={isCreate ? 'Nuevo Vehiculo' : 'Editar Vehiculo'}
      closeModal={onCloseComplete}
      openModal={active}
      btnSubmit={{
        text: isCreate ? 'Crear' : 'Guardar',
        onClick: methods.handleSubmit(onSubmit),
      }}
    >
      <UseFormWrapper methods={methods} className='grid gap-4'>
        <InputUseForm name='placa' label='Placa' defaultValue={selectedVehicle?.placa} />
        <InputUseForm name='capacidadAsientos' label='Capacidad' defaultValue={selectedVehicle?.capacidadAsientos} />
        {!isCreate && <InputUseForm name='asientosDisponibles' label='Asientos Disponibles' defaultValue={selectedVehicle?.asientosDisponibles} />}
        <SelectUseForm
          name='tipo'
          placeholder='Seleccione Tipo'
          options={optionsVehicle({ placa: placaWatched ?? '' })}
          defaultValue={selectedVehicle?.tipo ? [{ label: `${selectedVehicle?.tipo} - ${selectedVehicle?.placa}`, value: selectedVehicle?.tipo.toString() }] : undefined}
        />
      </UseFormWrapper>
    </WrapperModalForm>
  );
};

export default VehicleForm;
