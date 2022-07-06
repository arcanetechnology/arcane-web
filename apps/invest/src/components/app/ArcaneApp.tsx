/** @format */

import {
  createContext,
  FlowComponent,
  JSXElement,
  ErrorBoundary,
  useContext,
  Show,
  createResource,
} from 'solid-js';
import { fetchUserRegistration } from '../../api';

// app information type
const ArcaneAppContext = createContext();

type ArcaneAppProviderProps = {
  children: JSXElement;
  name: string;
};

const ArcaneAppProvider: FlowComponent<ArcaneAppProviderProps> = (props) => {
  const [data] = createResource(props.name, fetchUserRegistration);
  console.log(data());
  return (
    <ErrorBoundary fallback={<h1>There was some error</h1>}>
      <Show when={data()}>
        <ArcaneAppContext.Provider value={data}>
          {props.children}
        </ArcaneAppContext.Provider>
      </Show>
    </ErrorBoundary>
  );
};

export default ArcaneAppProvider;

export const useArcaneApp = () => {
  const ctx = useContext(ArcaneAppContext);

  if (!ctx)
    throw new Error(
      'useArcaneApp must be used within a <ArcaneAppContext.Provider />'
    );

  return ctx;
};