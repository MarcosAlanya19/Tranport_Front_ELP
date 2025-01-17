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
import { useGetDriversAvailable } from '../../../driver/hooks/useGetDriversAvailable';
import { useGetRoute } from '../../../route/hooks/useGetRoute';
import { useCreateJourney } from '../../hooks/useCreateJourney';
import { useUpdateJourney } from '../../hooks/useUpdateJourney';
import { IcreateJourneyServicePayload } from '../../services/createJourneyService';
import { IJourney } from '../../types/IJourney.type';
import { IJourneyForm, journeySchema } from './index.schema';

interface IProps {
  onClose: () => void;
  active: boolean;
  modalType: EFormType | undefined;
  refresh: () => void;
  selectedJourney: IJourney | null;
}

const JourneyForm: React.FC<IProps> = (props) => {
  const { active, onClose, modalType, refresh, selectedJourney } = props;
  const isCreate = modalType === EFormType.create;

  const methods = useForm<IJourneyForm>({
    resolver: yupResolver(journeySchema) as Resolver<IJourneyForm>,
  });

  const onCloseComplete = () => {
    methods.reset();
    onClose();
  };

  const GetRoute = useGetRoute();
  const GetDriversAvailable = useGetDriversAvailable();
  const GetReniec = useGetReniec();
  const CreateJourney = useCreateJourney();
  const UpdateJourney = useUpdateJourney();

  const optionsRoute = Array.isArray(GetRoute.data)
    ? GetRoute.data.map((route) => ({
        label: `${route.origen} -> ${route.destino}`,
        value: route.id.toString(),
      }))
    : [];

  const optionsDriver = Array.isArray(GetDriversAvailable.data)
    ? GetDriversAvailable.data.map((route) => ({
        label: `${route.nombres} -> ${route.licencia}`,
        value: route.id.toString(),
      }))
    : [];

  const dniWatched = useWatch({ control: methods.control, name: 'dni' });

  const onSubmit: (data: IJourneyForm) => Promise<void> = async (data) => {
    const payload: IcreateJourneyServicePayload = {
      rutaId: Number(data.rutaId.value),
      conductorId: Number(data.conductorId.value),
      fechaHoraSalida: data.fechaHoraSalida,
      fechaHoraLlegadaEstimada: data.fechaHoraLlegadaEstimada,
      clienteRequest: {
        dni: data.dni,
        nombres: data.nombres,
        apellidos: data.apellidos,
        email: data.email,
        telefono: data.telefono,
        direccion: data.direccion,
      },
    };

    if (isCreate) {
      await CreateJourney.handle({ payload }).then((res) => {
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

    await UpdateJourney.handle({ journeyId: selectedJourney?.id, payload }).then((res) => {
      if (res) {
        toast.success('Ruta actualizada con éxito.', {
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
    if (dniWatched?.length === 8) {
      dniDeuncedSearch(dniWatched);
    }
    return () => dniDeuncedSearch.cancel();
  }, [dniWatched]);

  React.useEffect(() => {
    (() => {
      Promise.all([GetRoute.handle(), GetDriversAvailable.handle()]);
    })();
  }, []);

  return (
    <WrapperModalForm
      title={isCreate ? 'Nuevo Viaje' : 'Editar Viaje'}
      closeModal={onCloseComplete}
      openModal={active}
      btnSubmit={{
        text: isCreate ? 'Crear' : 'Guardar',
        onClick: methods.handleSubmit(onSubmit),
      }}
    >
      <UseFormWrapper methods={methods}>
        <div className='grid gap-8 grid-cols-2'>
          {/* Formulario para el Viaje */}
          <section>
            <h3 className='text-lg font-bold mb-4'>Información del Viaje</h3>
            <div className='grid gap-4'>
              <InputUseForm type='datetime-local' name='fechaHoraSalida' label='Fecha y Hora de Salida' defaultValue={selectedJourney?.fechaHoraSalida?.substring(0, 16)} />
              <InputUseForm
                type='datetime-local'
                name='fechaHoraLlegadaEstimada'
                label='Fecha y Hora Estimada de Llegada'
                defaultValue={selectedJourney?.fechaHoraLlegadaEstimada?.substring(0, 16)}
              />
              <SelectUseForm name='rutaId' placeholder='Seleccione Ruta' options={optionsRoute} />
              <SelectUseForm name='conductorId' placeholder='Seleccione Conductor' options={optionsDriver} />
            </div>
          </section>

          {/* Formulario para el Cliente */}
          <section>
            <h3 className='text-lg font-bold mb-4'>Información del Cliente</h3>
            <div className='grid gap-4'>
              <InputUseForm name='dni' label='DNI' />
              <InputUseForm name='nombres' label='Nombres' />
              <InputUseForm name='apellidos' label='Apellidos' />
              <InputUseForm name='email' type='email' label='Email' />
              <InputUseForm name='telefono' type='number' label='Teléfono' />
              <InputUseForm name='direccion' label='Dirección' />
            </div>
          </section>
        </div>
      </UseFormWrapper>
    </WrapperModalForm>
  );
};

export default JourneyForm;
