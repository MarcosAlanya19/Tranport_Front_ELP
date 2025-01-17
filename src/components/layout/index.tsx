import React from 'react';


interface IProps {
  title: string;
  children: React.ReactNode;
  action: React.ReactNode;
}

export const ModuleLayout: React.FC<IProps> = (props) => {
  const { title, children, action } = props;

  return (
    <>
      <div className='bg-white p-6 rounded-lg shadow-lg'>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-3xl font-bold text-gray-800'>{title}</h2>
          {action}
        </div>

        <div className='mb-6 border-b border-gray-200'></div>

        {/* Body con tabla */}
        <div className='overflow-x-auto'>{children}</div>
      </div>
    </>
  );
};
