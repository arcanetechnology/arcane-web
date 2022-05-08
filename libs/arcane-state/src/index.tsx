/**
 * @ Author: Joel D'Souza
 * @ Create Time: 2022-05-06 13:53:50
 * @ Modified by: Joel D'Souza
 * @ Modified time: 2022-05-08 16:39:32
 * @ Description: arcane-state management library, which is like redux but made totally in react!
 *
 * @format
 */

import { useReducer, createContext, FC, ReactNode } from 'react';

type ActionFunction = (...args: any[]) => void;

interface Action<A> {
  (dispatch: React.Dispatch<A>): ActionFunction;
}

type Actions<A, T> = {
  [K in keyof T]: Action<A>;
};

type BoundedActions<T> = {
  [K in keyof T]: ActionFunction;
};

interface DataContextObject<S, T> {
  actions: BoundedActions<T>;
  state: S;
}

function createArcaneState<S, A, T>(
  reducer: React.Reducer<S, A>,
  actions: Actions<A, T>,
  initialState: S
): {
  Context: React.Context<DataContextObject<S, T>>;
  Provider: React.FC<ContextProviderProps>;
} {
  const Context = createContext({} as DataContextObject<S, T>);

  const Provider: FC<ContextProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const boundActions: BoundedActions<T> = {} as BoundedActions<T>;
    for (const key in actions) {
      boundActions[key] = actions[key](dispatch);
    }
    return (
      <Context.Provider value={{ state, actions: { ...boundActions } }}>
        {children}
      </Context.Provider>
    );
  };

  return { Context, Provider };
}

export default createArcaneState;

export type ContextProviderProps = { children: ReactNode };
