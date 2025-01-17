import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const handleBackToHomepage = () => {
    navigate('/');
  };

  return (
    <div className='h-screen w-screen bg-gray-100 flex items-center'>
      <div className='container flex flex-col md:flex-row items-center justify-center px-5 text-gray-700 gap-8'>
        <div className='max-w-md'>
          <div className='text-5xl font-dark font-bold'>404</div>
          <p className='text-2xl md:text-3xl font-light leading-normal'>Lo sentimos, no pudimos encontrar esta página.</p>
          <p className='mb-8'>Pero no te preocupes, puedes encontrar muchas otras cosas en nuestra página de inicio.</p>
          <button
            onClick={handleBackToHomepage}
            className='px-4 inline py-2 text-sm font-medium leading-5 shadow text-white transition-colors duration-150 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-blue bg-blue-600 active:bg-blue-600 hover:bg-blue-700'
          >
            Volver a la página de inicio
          </button>
        </div>
        <img src='./imgError.jpg' alt='404' width={400} height={400} />
      </div>
    </div>
  );
};

export default NotFound;
