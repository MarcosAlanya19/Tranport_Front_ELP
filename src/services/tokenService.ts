import { LocalStorageKey, localStorageUtils } from '../utils/localStorage';

export const tokenService = {
  getToken: () => localStorageUtils.get(LocalStorageKey.token),
  getName: () => localStorageUtils.get(LocalStorageKey.name),
  setToken: (token: string) => localStorageUtils.save(LocalStorageKey.token, token),
  setName: (name: string) => localStorageUtils.save(LocalStorageKey.name, name),
  removeToken: () => localStorageUtils.remove(LocalStorageKey.token),
};
