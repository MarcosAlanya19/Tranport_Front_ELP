import dayjs from 'dayjs';
import { Button, Dropdown } from 'flowbite-react';
import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { toast } from 'sonner';
import { DiscardModal } from '../../../components/discard-modal';
import { ModuleLayout } from '../../../components/layout';
import { Loader } from '../../../components/loader';
import { EFormType } from '../../../types/EFormType';
import { SkeletonTableJourney } from '../components/skeleton-table-journey';
import JourneyForm from '../container/journey-form';
import { useDeleteJourney } from '../hooks/useDeleteJourney';
import { useGetJourney } from '../hooks/useGetJourney';
import { useUpdateStatusJourney } from '../hooks/useUpdateStatusJourney';
import { EJourneyState, IJourney } from '../types/IJourney.type';
import { generatePDF } from '../utils/generatePDF';

const Journey: React.FC = () => {
  const [modalType, setModalType] = React.useState<EFormType | undefined>();
  const [selectedJourney, setSelectedJourney] = React.useState<IJourney | null>(null);

  const GetJourney = useGetJourney();
  const DeleteJourney = useDeleteJourney();
  const UpdateStatusJourney = useUpdateStatusJourney();

  const onCreateAction = () => {
    setModalType(EFormType.create);
  };

  const onDeleteAction = (driver: IJourney) => {
    setModalType(EFormType.delete);
    setSelectedJourney(driver);
  };

  const closeFormAction = () => {
    setModalType(undefined);
    setSelectedJourney(null);
  };

  const onDeleteConfirm = () => {
    if (selectedJourney?.id !== null) {
      DeleteJourney.handle({ journeyId: Number(selectedJourney?.id) }).then((res) => {
        if (res) {
          GetJourney.handle();
          toast.success('Viaje eliminado con éxito.', {
            position: 'top-right',
          });
          closeFormAction();
        }
      });
    }
  };

  const onStateChange = (newState: EJourneyState, row: IJourney) => {
    UpdateStatusJourney.handle({ journeyId: row.id, status: newState }).then((res) => {
      if (res) {
        GetJourney.handle();
        toast.success('Estado actualizado con éxito.', {
          position: 'top-right',
        });
      }
    });
  };

  React.useEffect(() => {
    GetJourney.handle();
  }, []);

  return (
    <>
      <ModuleLayout
        title='Gestión de Viajes'
        action={
          <Button color='blue' size='sm' onClick={onCreateAction}>
            Nuevo Viaje
          </Button>
        }
      >
        <table className='min-w-full table-auto'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='py-3 px-6 text-left text-sm font-medium text-gray-600'>Origen</th>
              <th className='py-3 px-6 text-left text-sm font-medium text-gray-600'>Destino</th>
              <th className='py-3 px-6 text-left text-sm font-medium text-gray-600'>Ticket</th>
              <th className='py-3 px-6 text-left text-sm font-medium text-gray-600'>Estado</th>
              <th className='py-3 px-6 text-left text-sm font-medium text-gray-600'>Precio Final</th>
              <th className='py-3 px-6 text-left text-sm font-medium text-gray-600'>Cliente</th>
              <th className='py-3 px-6 text-left text-sm font-medium text-gray-600'>Conductor</th>
              <th className='py-3 px-6 text-left text-sm font-medium text-gray-600'>Fecha de salida</th>
              <th className='py-3 px-6 text-left text-sm font-medium text-gray-600'>Fecha de llegada estimada</th>
              <th className='py-3 px-6 text-left text-sm font-medium text-gray-600'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {GetJourney.loading
              ? Array.from({ length: 5 }).map((_, index) => <SkeletonTableJourney key={index} />)
              : GetJourney.data?.map((row) => (
                  <tr key={row.id} className='border-b hover:bg-gray-50'>
                    <td className='py-3 px-6 text-sm text-gray-700'>{row.ruta.origen}</td>
                    <td className='py-3 px-6 text-sm text-gray-700'>{row.ruta.destino}</td>
                    <td className='py-3 px-6 text-sm text-gray-700'>
                      <button
                        className='text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-100'
                        onClick={() => generatePDF(row)}
                        aria-label={`Generar comprobante para ticket ${row.ticket}`}
                      >
                        {row.ticket}
                      </button>
                    </td>
                    <td className='py-3 px-6 text-sm'>
                      <span
                        className={`
      inline-block px-3 py-1 text-sm font-medium rounded-full
      ${
        row.estado === EJourneyState.PENDIENTE
          ? 'bg-yellow-100 text-yellow-800'
          : row.estado === EJourneyState.EN_CURSO
          ? 'bg-blue-100 text-blue-800'
          : row.estado === EJourneyState.COMPLETADO
          ? 'bg-green-100 text-green-800'
          : row.estado === EJourneyState.CANCELADO
          ? 'bg-red-100 text-red-800'
          : 'bg-gray-100 text-gray-800'
      }
    `}
                      >
                        {row.estado}
                      </span>
                    </td>
                    <td className='py-3 px-6 text-sm text-gray-700'>S/. {row.precioFinal.toFixed(2)}</td>
                    <td className='py-3 px-6 text-sm text-gray-700'>{`${row.cliente.nombres} ${row.cliente.apellidos}`}</td>
                    <td className='py-3 px-6 text-sm text-gray-700'>{`${row.conductor.nombres} ${row.conductor.apellidos}`}</td>
                    <td className='py-3 px-6 text-sm text-gray-700'>{dayjs(row.fechaHoraSalida).format('DD/MM/YYYY HH:mm:ss')}</td>
                    <td className='py-3 px-6 text-sm text-gray-700'>{dayjs(row.fechaHoraLlegadaEstimada).format('DD/MM/YYYY HH:mm:ss')}</td>
                    <td className='py-3 px-6 text-sm flex space-x-3'>
                      <StateDropdown row={row} onStateChange={onStateChange} />

                      <button className='text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-100' onClick={() => onDeleteAction(row)} aria-label={`Eliminar ${row.id}`}>
                        <FaTrashAlt className='w-5 h-5' />
                      </button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </ModuleLayout>

      <React.Suspense fallback={<Loader />}>
        <JourneyForm
          selectedJourney={selectedJourney}
          onClose={closeFormAction}
          modalType={modalType}
          refresh={() => GetJourney.handle()}
          active={modalType === EFormType.create || modalType === EFormType.edit}
        />
      </React.Suspense>

      <DiscardModal
        active={modalType === EFormType.delete}
        description='¿Estás seguro de que deseas eliminar este Viaje?'
        onClose={closeFormAction}
        onDeleteConfirm={onDeleteConfirm}
      />
    </>
  );
};

export default Journey;

const StateDropdown = ({ row, onStateChange }: { row: IJourney; onStateChange: (newState: EJourneyState, row: IJourney) => void }) => {
  return (
    <Dropdown label='Cambiar Estado' inline>
      <Dropdown.Item onClick={() => onStateChange(EJourneyState.COMPLETADO, row)} className='text-green-600 hover:bg-green-100'>
        Completar
      </Dropdown.Item>
      <Dropdown.Item onClick={() => onStateChange(EJourneyState.CANCELADO, row)} className='text-red-600 hover:bg-red-100'>
        Cancelar
      </Dropdown.Item>
    </Dropdown>
  );
};
