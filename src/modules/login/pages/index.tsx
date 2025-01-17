import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { Resolver, useForm } from 'react-hook-form';
import { InputUseForm } from '../../../components/input-use-form';
import { UseFormWrapper } from '../../../components/use-form-wrapper';
import { useBoolean } from '../../../utils/useBoolean';
import { useAuth } from '../hooks/useAuth';
import { ILoginForm, IRegisterForm, validationSchema } from './index.schema';

export const Login: React.FC = () => {
  const authState = useBoolean(true);
  const Auth = useAuth();

  const methods = useForm<IRegisterForm | ILoginForm>({
    resolver: yupResolver(validationSchema(authState.active)) as Resolver<ILoginForm>,
    defaultValues: {
      name: '',
      username: '',
      password: '',
    },
  });

  const onSubmit = async (data: IRegisterForm | ILoginForm) => {
    const payload = {
      username: data.username,
      password: data.password,
      ...(authState.active ? {} : { name: (data as IRegisterForm).name }),
    };

    if (authState.active) {
      await Auth.login({ payload });
    } else {
      await Auth.register({ payload: { ...payload, name: (data as IRegisterForm).name } });
      authState.toggle();
    }
  };

  const authStateToggle = () => {
    methods.reset();
    authState.toggle();
  };

  return (
    <div className='relative min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-purple-800 flex items-center justify-center'>
      <div className='flex flex-col sm:flex-row bg-white rounded-3xl shadow-xl'>
        {/* Left Section */}
        <div className='hidden lg:flex flex-col p-14 text-gray-900 max-w-md'>
          <h1 className='text-4xl font-semibold mb-4'>{authState.active ? '¡Bienvenido de nuevo!' : 'Crea tu cuenta'}</h1>
          <p className='text-sm opacity-90'>
            {authState.active ? 'Gestiona tus ventas de pasajes de manera rápida y eficiente.' : 'Regístrate para empezar a gestionar tus ventas de pasajes.'}
          </p>
        </div>
        {/* Right Section */}
        <div className='p-12 w-96'>
          <div className='mb-6'>
            <h3 className='text-2xl font-semibold text-gray-800'>{authState.active ? 'Iniciar sesión' : 'Registrarse'}</h3>
            <p className='text-sm text-gray-400'>
              {authState.active ? (
                <>
                  ¿No tienes una cuenta?{' '}
                  <a href='#' onClick={authStateToggle} className='text-purple-700 hover:underline'>
                    Regístrate
                  </a>
                </>
              ) : (
                <>
                  ¿Ya tienes una cuenta?{' '}
                  <a href='#' onClick={authStateToggle} className='text-purple-700 hover:underline'>
                    Iniciar sesión
                  </a>
                </>
              )}
            </p>
          </div>

          <UseFormWrapper className='space-y-6' methods={methods} onSubmit={() => methods.handleSubmit(onSubmit)()}>
            {/* Campo de nombre solo cuando no estamos en login */}
            {!authState.active && <InputUseForm name='name' label='Nombre' />}
            <InputUseForm name='username' label='Email' />
            <InputUseForm type='password' name='password' label='Contraseña' />

            {/* Botón de submit */}
            <button type='submit' className='w-full bg-purple-800 text-white p-3 rounded-lg hover:bg-purple-700 transition' disabled={Auth.loading}>
              {Auth.loading ? 'Cargando...' : authState.active ? 'Iniciar sesión' : 'Registrarse'}
            </button>
          </UseFormWrapper>

          {/* Mostrar error si existe */}
          {Auth.error && <p className='text-red-500 text-sm mt-4'>{Auth.error}</p>}
        </div>
      </div>
    </div>
  );
};
