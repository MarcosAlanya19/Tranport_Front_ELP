import { baseAxios } from '../../../api';

interface IloginServiceResponse {
  token: string;
  name: string;
}

export interface IloginServicePayload {
  username: string;
  password: string;
}

export const loginService = ({ payload }: { payload: IloginServicePayload }) => baseAxios.post<IloginServiceResponse>('/auth/login', payload);
