import { baseAxios } from '../../../api';

interface IregisterServiceResponse {
  token: string;
  name: string;
}

export interface IregisterServicePayload {
  username: string;
  password: string;
  name: string;
}

export const registerService = ({ payload }: { payload: IregisterServicePayload }) => baseAxios.post<IregisterServiceResponse>('/auth/register', payload);
