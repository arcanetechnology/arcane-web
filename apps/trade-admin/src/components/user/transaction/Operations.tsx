/** @format */

import { createContext, createUniqueId, useContext, onMount } from 'solid-js';
import type { ParentComponent } from 'solid-js';
import { createStore, produce } from 'solid-js/store';
import {
  Operations as OperationsType,
  SearchAbleAccounts,
} from './Transaction.types';
import { Profile } from '../../../types';

type OperationStore = {
  operations: OperationsType;
  accounts: Array<SearchAbleAccounts>;
};

type OperationContextData = [
  OperationStore,
  {
    addOperations: () => void;
    removeOperation: (id: string) => void;
    addTransaction: (id: string) => void;
    deleteTransaction: (id: string, transactionId: string) => void;
  }
];

const OperationContext = createContext<OperationContextData>();

const normalizeAccounts = (profiles: Profile[]): Array<SearchAbleAccounts> =>
  profiles.flatMap((profile) =>
    profile.accounts.flatMap((acc) =>
      acc.portfolios.flatMap((p) =>
        p.cryptoAccounts.flatMap(
          (c) =>
            ({
              accountAlias: acc.alias,
              accountCurrency: acc.currency,
              accountId: acc.id,
              cryptoAccountId: c.id,
              cryptoAlias: c.alias,
              cryptoCurrency: c.currency,
              cryptoId: c.id,
              portfolioAlias: p.alias,
              portfolioId: p.id,
              profileAlias: profile.alias,
              profileId: profile.id,
              profileType: profile.type,
            } as SearchAbleAccounts)
        )
      )
    )
  );

type OperationProvider = {
  profiles: Profile[];
};

export const OperationProvider: ParentComponent<OperationProvider> = (
  props
) => {
  const [operations, setOperations] = createStore<OperationStore>({
    operations: [],
    accounts: [],
  });

  onMount(() => {
    setOperations({
      operations: [],
      accounts: normalizeAccounts(props.profiles),
    });
  });

  const operation = [
    operations,
    {
      addOperations: () => {
        setOperations(
          produce((o) => {
            o.operations.push({
              id: createUniqueId(),
              transactions: [
                {
                  id: createUniqueId(),
                  accountId: '',
                  amount: '',
                  currency: '',
                },
              ],
            });
          })
        );
      },

      removeOperation: (operationId: string) => {
        setOperations(
          produce((o) => {
            o.operations.splice(
              o.operations.findIndex((o) => o.id === operationId),
              1
            );
          })
        );
      },

      addTransaction: (operationId: string) => {
        setOperations(
          produce((o) => {
            const operation = o.operations.find((o) => o.id === operationId);
            operation.transactions.push({
              id: createUniqueId(),
              accountId: '',
              amount: '',
              currency: '',
            });
          })
        );
      },

      deleteTransaction: (operationId: string, transactionId: string) => {
        setOperations(
          produce((o) => {
            const operation = o.operations.find((o) => o.id === operationId);
            operation.transactions = operation.transactions.filter(
              (t) => t.id !== transactionId
            );
          })
        );
      },
    },
  ];

  return (
    <OperationContext.Provider value={operation as OperationContextData}>
      {props.children}
    </OperationContext.Provider>
  );
};

export const useOperations = () => {
  return useContext(OperationContext);
};
