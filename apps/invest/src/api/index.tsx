/** @format */

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'solid-app-router';
import toast from 'solid-toast';

// TODO: puth the auth part to service worker so this should be cleaner.

export const fetchUserRegistration = async () => {
  const auth = getAuth();
  const navigate = useNavigate();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      user
        .getIdToken()
        .then(async (token) => {
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
            navigate('/');
          }

          if (res.status === 200) {
            navigate('/home', { replace: true, resolve: true });
          }
        })
        .catch((err) => {
          toast.error(err.message);
          navigate('/');
        });
    } else {
      navigate('/');
    }
  });
};

interface PostUserRegistrationValue<R> {
  body: R;
  name: string;
}

export const postUserRegistration = async <R,>(
  values: PostUserRegistrationValue<R>
) => {
  const auth = getAuth();
  const navigate = useNavigate();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      user
        .getIdToken()
        .then(async (token) => {
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
          }

          if (res.status === 400) {
            const body = await res.json();
            body.map((err) => {
              toast.error(err);
            });
          }

          if (res.status === 200) {
            navigate('/home', { replace: true, resolve: true });
          }
        })
        .catch((err) => {
          toast.error(err.message);
        });
    } else {
      navigate('/');
    }
  });
};
