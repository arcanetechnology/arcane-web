/** @format */

import { useTradeDispatch } from '@/state';
import { login, logout } from '@/state/auth';
import { useNavigate } from 'react-router-dom';

export const useLogin = (path: string) => {
  const dispatch = useTradeDispatch();
  const navigate = useNavigate();
  const authorize = (
    email: string | null,
    uid: string,
    photoUrl: string | null,
    displayName: string | null
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
