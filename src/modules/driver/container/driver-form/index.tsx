import _ from 'lodash';
import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { Resolver, useForm, useWatch } from 'react-hook-form';
import { toast } from 'sonner';
import { InputUseForm } from '../../../../components/input-use-form';
import { SelectUseForm } from '../../../../components/select-use-form';
import { UseFormWrapper } from '../../../../components/use-form-wrapper';
import { WrapperModalForm } from '../../../../components/wrapper-modal-form';
import { useGetReniec } from '../../../../hooks/useReniec';
import { EFormType } from '../../../../types/EFormType';
import { IReniec } from '../../../../types/IReniec.type';
import { localStorageUtils } from '../../../../utils/localStorage';
import { useGetVehicleNotDriver } from '../../../vehicle/hooks/useGetVehicleNotDriver';
import { useCreateDriver } from '../../hooks/useCreateDriver';
import { useUpdateDriver } from '../../hooks/useUpdateDriver';
import { IcreateDriverServicePayload } from '../../services/createDriverService';
import { IDriver } from '../../types/IDriver.type';
import { driverSchema, IDriverForm } from './index.schema';

interface IProps {
  onClose: () => void;
  active: boolean;
  modalType: EFormType | undefined;
  refresh: () => void;
  selectedDriver: IDriver | null;
}

const DriverForm: React.FC<IProps> = (props) => {
  const { active, onClose, modalType, refresh, selectedDriver } = props;
  const isCreate = modalType === EFormType.create;

  const methods = useForm<IDriverForm>({
    resolver: yupResolver(driverSchema) as Resolver<IDriverForm>,
  });

  const onCloseComplete = () => {
    methods.reset();
    onClose();
  };

  const GetVehicleNotDriver = useGetVehicleNotDriver();
  const CreateDriver = useCreateDriver();
  const UpdateDriver = useUpdateDriver();
  const GetReniec = useGetReniec();

  const optionsVehicle = Array.isArray(GetVehicleNotDriver.data)
    ? GetVehicleNotDriver.data.map((item) => ({
        label: `${item?.tipo} - ${item?.placa}`,
        value: item.id.toString(),
      }))
    : [];

  const dniWatched = useWatch({ control: methods.control, name: 'dni' });

  const onSubmit: (data: IDriverForm) => Promise<void> = async (data) => {
    const payload: IcreateDriverServicePayload = {
      dni: data.dni,
      nombres: data.nombres,
      apellidos: data.apellidos,
      licencia: data.licencia?.toUpperCase(),
      vehiculoId: Number(data.vehiculo.value),
      disponible: true,
    };

    if (isCreate) {
      await CreateDriver.handle({ payload }).then((res) => {
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

    await UpdateDriver.handle({ driverId: selectedDriver?.id, payload }).then((res) => {
      if (res) {
        toast.success('Conductor actualizado con éxito.', {
          position: 'top-right',
        });
        refresh();
        onCloseComplete();
      }
    });
  };

  const getLocalOrPetition = async (dni: string | number) => {
    const storedData = localStorageUtils.get<IReniec>(dni?.toString());
    if (storedData) {
      methods.setValue('nombres', storedData.nombres || '');
      methods.setValue('apellidos', `${storedData.apellidoPaterno} ${storedData.apellidoMaterno}`);
    } else {
      const res = await GetReniec.handle({ userDni: dni });
      if (res) {
        methods.setValue('nombres', res?.nombres || '');
        methods.setValue('apellidos', `${res?.apellidoPaterno} ${res?.apellidoMaterno}`);
        localStorageUtils.save(dni.toString(), res);
      }
    }
  };

  const dniDeuncedSearch = React.useMemo(
    () =>
      _.debounce((query: string | number) => {
        if (typeof query === 'string' && query.length === 8) {
          getLocalOrPetition(query);
        }
      }, 800),
    []
  );

  React.useEffect(() => {
    if (selectedDriver?.id !== null) {
      methods.reset();
    }
  }, [selectedDriver?.id]);

  React.useEffect(() => {
    if (dniWatched?.length === 8) {
      dniDeuncedSearch(dniWatched);
    }
    return () => dniDeuncedSearch.cancel();
  }, [dniWatched]);

  React.useEffect(() => {
    (() => {
      GetVehicleNotDriver.handle();
    })();
  }, []);

  return (
    <WrapperModalForm
      title={isCreate ? 'Nuevo Conductor' : 'Editar Conductor'}
      closeModal={onCloseComplete}
      openModal={active}
      btnSubmit={{
        text: isCreate ? 'Crear' : 'Guardar',
        onClick: methods.handleSubmit(onSubmit),
      }}
    >
      <UseFormWrapper methods={methods} className='grid gap-4'>
        <InputUseForm name='dni' label='DNI' type='number' onChange={dniDeuncedSearch} defaultValue={selectedDriver?.dni} />
        <InputUseForm
          name='nombres'
          label='Nombres'
          disabled={dniWatched?.length < 7}
          defaultValue={selectedDriver?.nombres}
          helperText={dniWatched?.length < 7 ? 'El DNI es obligatorio' : ''}
        />
        <InputUseForm
          name='apellidos'
          label='Apellidos'
          disabled={dniWatched?.length < 7}
          defaultValue={selectedDriver?.apellidos}
          helperText={dniWatched?.length < 7 ? 'El DNI es obligatorio' : ''}
        />
        <InputUseForm name='licencia' label='Licencia' defaultValue={selectedDriver?.licencia} />
        <SelectUseForm
          name='vehiculo'
          placeholder='Seleccione Vehiculo'
          options={optionsVehicle}
          defaultValue={
            selectedDriver?.vehiculo ? [{ label: `${selectedDriver.vehiculo.tipo} ${selectedDriver.vehiculo.placa}`, value: selectedDriver.vehiculo.id.toString() }] : undefined
          }
        />
      </UseFormWrapper>
    </WrapperModalForm>
  );
};

export default DriverForm;
