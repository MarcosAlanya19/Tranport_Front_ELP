import React from 'react';

import dayjs from 'dayjs';
import { Button } from 'flowbite-react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { toast } from 'sonner';
import { DiscardModal } from '../../../components/discard-modal';
import { ModuleLayout } from '../../../components/layout';
import { EFormType } from '../../../types/EFormType';
import { SkeletonTableDriver } from '../components/skeleton-table-driver';
import { useDeleteDriver } from '../hooks/useDeleteDriver';
import { useGetDrivers } from '../hooks/useGetDrivers';
import { IDriver } from '../types/IDriver.type';
import { Loader } from '../../../components/loader';

const DriverForm = React.lazy(() => import('../container/driver-form'));

const Driver: React.FC = () => {
  const [modalType, setModalType] = React.useState<EFormType | undefined>();
  const [selectedDriver, setSelectedDriver] = React.useState<IDriver | null>(null);

  const GetDrivers = useGetDrivers();
  const DeleteDriver = useDeleteDriver();

  const onCreateAction = () => {
    setModalType(EFormType.create);
  };

  const onDeleteAction = (driver: IDriver) => {
    setModalType(EFormType.delete);
    setSelectedDriver(driver);
  };

  const onEditAction = (driver: IDriver) => {
    setModalType(EFormType.edit);
    setSelectedDriver(driver);
  };

  const closeFormAction = () => {
    setModalType(undefined);
    setSelectedDriver(null);
  };

  const onDeleteConfirm = () => {
    if (selectedDriver?.id !== null) {
      DeleteDriver.handle({ driverId: Number(selectedDriver?.id) }).then((res) => {
        if (res) {
          GetDrivers.handle();
          toast.success('Conductor eliminado con éxito.', {
            position: 'top-right',
          });
          closeFormAction();
        }
      });
    }
  };

  React.useEffect(() => {
    GetDrivers.handle();
  }, []);

  return (
    <>
      <ModuleLayout
        title='Gestión de Conductores'
        action={
          <Button color='blue' size='sm' onClick={onCreateAction}>
            Nuevo Conductor
          </Button>
        }
      >
        <table className='min-w-full table-auto'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='py-3 px-6 text-left text-sm font-medium text-gray-600'>DNI</th>
              <th className='py-3 px-6 text-left text-sm font-medium text-gray-600'>Nombre Completo</th>
              <th className='py-3 px-6 text-left text-sm font-medium text-gray-600'>Licencia</th>
              <th className='py-3 px-6 text-left text-sm font-medium text-gray-600'>Disponible</th>
              <th className='py-3 px-6 text-left text-sm font-medium text-gray-600'>Creado</th>
              <th className='py-3 px-6 text-left text-sm font-medium text-gray-600'>Actualizado</th>
              <th className='py-3 px-6 text-left text-sm font-medium text-gray-600'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {GetDrivers.loading
              ? Array.from({ length: 5 }).map((_, index) => <SkeletonTableDriver key={index} />)
              : GetDrivers.data?.map((row) => (
                  <tr key={row.id} className='border-b'>
                    <td className='py-3 px-6 text-sm text-gray-700'>{row.dni}</td>
                    <td className='py-3 px-6 text-sm text-gray-700'>{`${row.nombres} ${row.apellidos}`}</td>
                    <td className='py-3 px-6 text-sm text-gray-700'>{row.licencia}</td>
                    <td className='py-3 px-6 text-sm text-gray-700'>
                      <div
                        className={`py-1 px-3 rounded-full text-white text-xs text-center font-medium ${
                          row.disponible ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'
                        }`}
                      >
                        {row.disponible ? 'Si' : 'No'}
                      </div>
                    </td>
                    <td className='py-3 px-6 text-sm text-gray-700'>{dayjs(row.creadoEn).format('DD/MM/YYYY HH:mm:ss')}</td>
                    <td className='py-3 px-6 text-sm text-gray-700'>{dayjs(row.actualizadoEn).format('DD/MM/YYYY HH:mm:ss')}</td>
                    <td className='py-3 px-6 text-sm flex space-x-3'>
                      <button className='text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-100' onClick={() => onEditAction(row)}>
                        <FaEdit className='w-5 h-5' />
                      </button>
                      <button className='text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-100' onClick={() => onDeleteAction(row)}>
                        <FaTrashAlt className='w-5 h-5' />
                      </button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </ModuleLayout>

      <React.Suspense fallback={<Loader />}>
        <DriverForm
          selectedDriver={selectedDriver}
          onClose={closeFormAction}
          modalType={modalType}
          refresh={() => GetDrivers.handle()}
          active={modalType === EFormType.create || modalType === EFormType.edit}
        />
      </React.Suspense>

      <DiscardModal
        active={modalType === EFormType.delete}
        description='¿Estás seguro de que deseas eliminar este conductor?'
        onClose={closeFormAction}
        onDeleteConfirm={onDeleteConfirm}
      />
    </>
  );
};

export default Driver;
