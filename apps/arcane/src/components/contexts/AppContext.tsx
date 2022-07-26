/** @format */
import type { ParentComponent } from 'solid-js';
import type { Apps } from '~/types';

interface AppContextInterface {
  isDark: boolean;
  loading: boolean;
  showCookie: boolean;
  apps: Apps;
}

const AppContext = createContext<AppContextInterface>({
  isDark: false,
  loading: true,
  showCookie: true,
  apps: [],
});

export const AppContextProvider: ParentComponent = (props) => {
  const data = useRouteData<AppContextInterface>();
  return (
    <AppContext.Provider value={data}>{props.children}</AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
