import React from 'react';

import dayjs from 'dayjs';
import { Button } from 'flowbite-react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { toast } from 'sonner';
import { DiscardModal } from '../../../components/discard-modal';
import { ModuleLayout } from '../../../components/layout';
import { Loader } from '../../../components/loader';
import { EFormType } from '../../../types/EFormType';
import { SkeletonTableVehicle } from '../components/skeleton-table-vehicle';
import { useDeleteVehicle } from '../hooks/useDeleteVehicle';
import { useGetVehicle } from '../hooks/useGetVehicle';
import { IVehicle } from '../types/IVehicle.type';

const VehicleForm = React.lazy(() => import('../container/vehicle-form'));

const Vehicle: React.FC = () => {
  const [modalType, setModalType] = React.useState<EFormType | undefined>();
  const [selectedVehicle, setSelectedVehicle] = React.useState<IVehicle | null>(null);

  const GetVehicle = useGetVehicle();
  const DeleteVehicle = useDeleteVehicle();

  const onCreateAction = () => {
    setModalType(EFormType.create);
  };

  const onDeleteAction = (driver: IVehicle) => {
    setModalType(EFormType.delete);
    setSelectedVehicle(driver);
  };

  const onEditAction = (driver: IVehicle) => {
    setModalType(EFormType.edit);
    setSelectedVehicle(driver);
  };

  const closeFormAction = () => {
    setModalType(undefined);
    setSelectedVehicle(null);
  };

  const onDeleteConfirm = () => {
    if (selectedVehicle?.id !== null) {
      DeleteVehicle.handle({ vehicleId: Number(selectedVehicle?.id) }).then((res) => {
        if (res) {
          GetVehicle.handle();
          toast.success('Vehiculo eliminado con éxito.', {
            position: 'top-right',
          });
          closeFormAction();
        }
      });
    }
  };

  React.useEffect(() => {
    GetVehicle.handle();
  }, []);

  return (
    <>
      <ModuleLayout
        title='Gestión de Vehiculos'
        action={
          <Button color='blue' size='sm' onClick={onCreateAction}>
            Nuevo Vehiculo
          </Button>
        }
      >
        <table className='min-w-full table-auto'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='py-3 px-6 text-left text-sm font-medium text-gray-600'>Placa</th>
              <th className='py-3 px-6 text-left text-sm font-medium text-gray-600'>Tipo</th>
              <th className='py-3 px-6 text-left text-sm font-medium text-gray-600'>Capacidad</th>
              <th className='py-3 px-6 text-left text-sm font-medium text-gray-600'>Disponible</th>
              <th className='py-3 px-6 text-left text-sm font-medium text-gray-600'>Conductor</th>
              <th className='py-3 px-6 text-left text-sm font-medium text-gray-600'>Creado</th>
              <th className='py-3 px-6 text-left text-sm font-medium text-gray-600'>Actualizado</th>
              <th className='py-3 px-6 text-left text-sm font-medium text-gray-600'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {GetVehicle.loading
              ? Array.from({ length: 5 }).map((_, index) => <SkeletonTableVehicle key={index} />)
              : GetVehicle.data?.map((row) => (
                  <tr key={row.id} className='border-b hover:bg-gray-50'>
                    <td className='py-3 px-6 text-sm text-gray-700'>{row.placa}</td>
                    <td className='py-3 px-6 text-sm text-gray-700'>{row.tipo}</td>
                    <td className='py-3 px-6 text-sm text-gray-700'>{row.capacidadAsientos}</td>
                    <td className='py-3 px-6 text-sm text-gray-700'>{row.asientosDisponibles}</td>
                    <td className='py-3 px-6 text-sm text-gray-700'>{row.conductor ? `${row.conductor.nombres} ${row.conductor.apellidos}` : 'Sin Conductor'}</td>
                    <td className='py-3 px-6 text-sm text-gray-700'>{dayjs(row.creadoEn).format('DD/MM/YYYY HH:mm:ss')}</td>
                    <td className='py-3 px-6 text-sm text-gray-700'>{dayjs(row.actualizadoEn).format('DD/MM/YYYY HH:mm:ss')}</td>
                    <td className='py-3 px-6 text-sm flex space-x-3'>
                      <button className='text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-100' onClick={() => onEditAction(row)} aria-label={`Editar ${row.placa}`}>
                        <FaEdit className='w-5 h-5' />
                      </button>
                      <button
                        className='text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-100'
                        onClick={() => onDeleteAction(row)}
                        aria-label={`Eliminar ${row.placa}`}
                      >
                        <FaTrashAlt className='w-5 h-5' />
                      </button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </ModuleLayout>

      <React.Suspense fallback={<Loader />}>
        <VehicleForm
          selectedVehicle={selectedVehicle}
          onClose={closeFormAction}
          modalType={modalType}
          refresh={() => GetVehicle.handle()}
          active={modalType === EFormType.create || modalType === EFormType.edit}
        />
      </React.Suspense>

      <DiscardModal
        active={modalType === EFormType.delete}
        description='¿Estás seguro de que deseas eliminar este vehiculo?'
        onClose={closeFormAction}
        onDeleteConfirm={onDeleteConfirm}
      />
    </>
  );
};

export default Vehicle;
