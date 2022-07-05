/** @format */

import { getAuth } from 'firebase/auth';
import { useNavigate } from 'solid-app-router';

export const getAuthToken = async () => {
  const navigate = useNavigate();
  try {
    const auth = getAuth();
    const token = await auth.currentUser.getIdToken();
    return token;
  } catch (err) {
    navigate('/', { replace: true });
    throw new Error('user is not authenticated');
  }
};

export const fetchUserRegistration = async (
  name: string = import.meta.env.VITE_APP_NAME
) => {
  const navigate = useNavigate();
  try {
    const token = await getAuthToken();
    const res = await fetch(
      import.meta.env.VITE_BACKEND + '/apps/' + name + '/register',
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    if (res.status) {
      navigate('/register', { replace: true });
      return null;
    }
    return res.json();
  } catch (err) {
    navigate('/', { replace: true });
    return null;
  }
};

export const postUserRegistration = async () => {};
