/** @format */

import { getAuth } from 'firebase/auth';
import { useNavigate } from 'solid-app-router';
import toast from 'solid-toast';

// TODO: puth the auth part to service worker so this should be cleaner.

export const getAuthToken = async () => {
  const auth = getAuth();
  const token = await auth.currentUser.getIdToken();
  return token;
};

export const fetchUserRegistration = async () => {
  const navigate = useNavigate();
  try {
    const token = await getAuthToken();
    const res = await fetch(
      import.meta.env.VITE_BACKEND +
        '/apps/' +
        import.meta.env.VITE_APP_NAME +
        '/funds/' +
        'arcane-assets-fund-limited',
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    if (res.status >= 400) {
      navigate('/register', { replace: true });
    }
    return 'success';
  } catch (err) {
    return navigate('/');
  }
};

interface PostUserRegistrationValue<R> {
  body: R;
  name: string;
}

export const postUserRegistration = async <R,>(
  values: PostUserRegistrationValue<R>
) => {
  const navigate = useNavigate();
  try {
    const token = await getAuthToken();
    const res = await fetch(
      import.meta.env.VITE_BACKEND +
        '/apps/' +
        values.name +
        '/funds/' +
        'arcane-assets-fund-limited',
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(values.body),
      }
    );

    if (res.status >= 401) {
      navigate('/nonprofessional');
      return null;
    }

    const body = await res.json();

    if (res.status === 400) {
      body.map((err) => {
        toast.error(err);
      });
      navigate('/register');
    }
  } catch (err) {
    navigate('/', { replace: true });
    return null;
  }
};
