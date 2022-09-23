/** @format */

import { useTradeDispatch } from '@/state';
import { login, logout } from '@/state/auth';
import { Auth } from '@/types/frontend';
import { useNavigate } from 'react-router-dom';

export const useLogin = (path: string) => {
  const dispatch = useTradeDispatch();
  const navigate = useNavigate();
  const authorize = (
    email: string | undefined,
    uid: string,
    photoUrl: string | undefined,
    displayName: string | undefined
  ) => {
    dispatch(login({ email, uid, photoUrl, displayName }));
    navigate(path);
  };

  return authorize;
};

export const useLogout = () => {
  const dispatch = useTradeDispatch();
  const unAuthorize = () => {
    dispatch(logout());
  };
  return unAuthorize;
};

export const useCheckAuth = () => {
  const auth = sessionStorage.getItem('auth');
  if (!auth) {
    return null;
  }

  return JSON.parse(auth) as Auth;
};
