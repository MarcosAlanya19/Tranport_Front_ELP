import * as yup from "yup";

export interface ILoginForm {
  username: string;
  password: string;
}

export interface IRegisterForm extends ILoginForm {
  name?: string;
}

export const validationSchema = (authState: boolean) => {
  return yup.object().shape({
    username: yup.string().email('Email inválido').required('El email es obligatorio'),
    password: yup.string().min(6, 'La contraseña debe tener al menos 6 caracteres').required('La contraseña es obligatoria'),
    name: authState ? yup.string().notRequired() : yup.string().required('El nombre es obligatorio'),
  });
};
