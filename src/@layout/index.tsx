import React from 'react';

import { FaCar, FaRoute, FaSignOutAlt, FaTruck } from 'react-icons/fa';
import { FaTicket } from 'react-icons/fa6';
import { NavLink, Outlet } from 'react-router-dom';
import { navigationRoutes } from '../@routes/navigate';
import { useAuth } from '../modules/login/hooks/useAuth';
import { tokenService } from '../services/tokenService';

const Layout: React.FC = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className='min-h-screen bg-gray-50/50 flex'>
      <aside className='bg-gradient-to-br from-gray-800 to-gray-900 fixed inset-y-0 left-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300'>
        <div className='relative border-b border-white/20'>
          <a className='flex items-center gap-4 py-6 px-8' href='#/'>
            <h6 className='block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-white'>Bienvenido {tokenService.getName() as string}</h6>
          </a>
        </div>

        <div className='flex flex-col justify-between h-[calc(100vh-150px)]'>
          <div className='m-4'>
            <ul className='mb-4 flex flex-col gap-1'>
              {navigationRoutes.map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg w-full flex items-center gap-4 px-4 capitalize ${
                        isActive
                          ? 'bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40'
                          : 'text-gray-300 hover:bg-gray-700'
                      }`
                    }
                  >
                    {(link.path === '/driver' || link.path === '/') && <FaTruck className='w-5 h-5 text-inherit' />}
                    {link.path === '/route' && <FaRoute className='w-5 h-5 text-inherit' />}
                    {link.path === '/journey' && <FaTicket className='w-5 h-5 text-inherit' />}
                    {link.path === '/vehicle' && <FaCar className='w-5 h-5 text-inherit' />}
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          {/* Cierre de sesión */}
          <div className='mt-auto m-4'>
            <button onClick={() => handleLogout()} className='flex items-center gap-2 text-gray-300 hover:text-white hover:bg-gray-700 p-3 rounded-lg w-full'>
              <FaSignOutAlt className='w-5 h-5' />
              Cerrar Sesión
            </button>
          </div>
        </div>
      </aside>
      <main className='p-4 ml-80 w-full'>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
