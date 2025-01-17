import Skeleton from "react-loading-skeleton";

export const SkeletonTableDriver: React.FC = () => {
  return (
    <>
      <tr className='border-b'>
        <td className='py-3 px-6 text-sm text-gray-700'>
          <Skeleton width={100} />
        </td>
        <td className='py-3 px-6 text-sm text-gray-700'>
          <Skeleton width={100} />
        </td>
        <td className='py-3 px-6 text-sm text-gray-700'>
          <Skeleton width={100} />
        </td>
        <td className='py-3 px-6 text-sm text-gray-700'>
          <Skeleton width={100} />
        </td>
        <td className='py-3 px-6 text-sm text-gray-700'>
          <Skeleton width={100} />
        </td>
        <td className='py-3 px-6 text-sm text-gray-700'>
          <Skeleton width={100} />
        </td>
        <td className='py-3 px-6 text-sm flex space-x-3'>
          <Skeleton circle width={40} height={40} />
          <Skeleton circle width={40} height={40} />
        </td>
      </tr>
    </>
  );
};
