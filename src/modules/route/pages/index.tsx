import React from 'react';

import dayjs from 'dayjs';
import { Button } from 'flowbite-react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { toast } from 'sonner';
import { DiscardModal } from '../../../components/discard-modal';
import { ModuleLayout } from '../../../components/layout';
import { Loader } from '../../../components/loader';
import { EFormType } from '../../../types/EFormType';
import { IRoute } from '../types/IRoute.type';
import { useGetRoute } from '../hooks/useGetRoute';
import { useDeleteRoute } from '../hooks/useDeleteRoute';
import { SkeletonTableRoute } from '../components/skeleton-table-route';

const RouteForm = React.lazy(() => import('../container/route-form'));

const Route: React.FC = () => {
  const [modalType, setModalType] = React.useState<EFormType | undefined>();
  const [selectedRoute, setSelectedRoute] = React.useState<IRoute | null>(null);

  const GetRoute = useGetRoute();
  const DeleteRoute = useDeleteRoute();

  const onCreateAction = () => {
    setModalType(EFormType.create);
  };

  const onDeleteAction = (driver: IRoute) => {
    setModalType(EFormType.delete);
    setSelectedRoute(driver);
  };

  const onEditAction = (driver: IRoute) => {
    setModalType(EFormType.edit);
    setSelectedRoute(driver);
  };

  const closeFormAction = () => {
    setModalType(undefined);
    setSelectedRoute(null);
  };

  const onDeleteConfirm = () => {
    if (selectedRoute?.id !== null) {
      DeleteRoute.handle({ routeId: Number(selectedRoute?.id) }).then((res) => {
        if (res) {
          GetRoute.handle();
          toast.success('Ruta eliminada con éxito.', {
            position: 'top-right',
          });
          closeFormAction();
        }
      });
    }
  };

  React.useEffect(() => {
    GetRoute.handle();
  }, []);

  return (
    <>
      <ModuleLayout
        title='Gestión de Rutas'
        action={
          <Button color='blue' size='sm' onClick={onCreateAction}>
            Nueva Ruta
          </Button>
        }
      >
        <table className='min-w-full table-auto'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='py-3 px-6 text-left text-sm font-medium text-gray-600'>Origen</th>
              <th className='py-3 px-6 text-left text-sm font-medium text-gray-600'>Destino</th>
              <th className='py-3 px-6 text-left text-sm font-medium text-gray-600'>Distancia</th>
              <th className='py-3 px-6 text-left text-sm font-medium text-gray-600'>Precio base</th>
              <th className='py-3 px-6 text-left text-sm font-medium text-gray-600'>Creado</th>
              <th className='py-3 px-6 text-left text-sm font-medium text-gray-600'>Actualizado</th>
              <th className='py-3 px-6 text-left text-sm font-medium text-gray-600'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {GetRoute.loading
              ? Array.from({ length: 5 }).map((_, index) => <SkeletonTableRoute key={index} />)
              : GetRoute.data?.map((row) => (
                  <tr key={row.id} className='border-b hover:bg-gray-50'>
                    <td className='py-3 px-6 text-sm text-gray-700'>{row.origen}</td>
                    <td className='py-3 px-6 text-sm text-gray-700'>{row.destino}</td>
                    <td className='py-3 px-6 text-sm text-gray-700'>{row.distancia} Km</td>
                    <td className='py-3 px-6 text-sm text-gray-700'>S/. {row.precioBase?.toFixed(2)}</td>
                    <td className='py-3 px-6 text-sm text-gray-700'>{dayjs(row.creadoEn).format('DD/MM/YYYY HH:mm:ss')}</td>
                    <td className='py-3 px-6 text-sm text-gray-700'>{dayjs(row.actualizadoEn).format('DD/MM/YYYY HH:mm:ss')}</td>
                    <td className='py-3 px-6 text-sm flex space-x-3'>
                      <button className='text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-100' onClick={() => onEditAction(row)} aria-label={`Editar ${row.id}`}>
                        <FaEdit className='w-5 h-5' />
                      </button>
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
        <RouteForm
          selectedVehicle={selectedRoute}
          onClose={closeFormAction}
          modalType={modalType}
          refresh={() => GetRoute.handle()}
          active={modalType === EFormType.create || modalType === EFormType.edit}
        />
      </React.Suspense>

      <DiscardModal
        active={modalType === EFormType.delete}
        description='¿Estás seguro de que deseas eliminar esta Ruta?'
        onClose={closeFormAction}
        onDeleteConfirm={onDeleteConfirm}
      />
    </>
  );
};

export default Route;
