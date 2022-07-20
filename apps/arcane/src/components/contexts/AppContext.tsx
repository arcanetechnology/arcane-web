/** @format */
import type { ParentComponent } from 'solid-js';

interface AppContextInterface {
  isDark: boolean;
  loading: boolean;
}

const AppContext = createContext<AppContextInterface>({
  isDark: false,
  loading: true,
});

export const AppContextProvider: ParentComponent = (props) => {
  const data = useRouteData<AppContextInterface>();
  return (
    <AppContext.Provider value={data}>{props.children}</AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
