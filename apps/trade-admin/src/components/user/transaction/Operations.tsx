/** @format */

import { createContext, createUniqueId, useContext } from 'solid-js';
import type { ParentComponent } from 'solid-js';
import { createStore, produce } from 'solid-js/store';
import { Operations as OperationsType, Transaction } from './Transaction.types';

type OperationContextData = [
  OperationsType,
  {
    addOperations: () => void;
    removeOperation: (id: string) => void;
    addTransaction: (id: string) => void;
    deleteTransaction: (id: string, transactionId: string) => void;
  }
];

const OperationContext = createContext<OperationContextData>();

export const OperationProvider: ParentComponent = (props) => {
  const [operations, setOperations] = createStore<OperationsType>([]);

  const operation = [
    operations,
    {
      addOperations: () => {
        setOperations(
          produce((o) => {
            o.push({
              id: createUniqueId(),
              transactions: [{ id: '', amount: '', currency: '' }],
            });
          })
        );
      },

      removeOperation: (operationId: string) => {
        setOperations(
          produce((o) => {
            o.splice(
              o.findIndex((o) => o.id === operationId),
              1
            );
          })
        );
      },

      addTransaction: (operationId: string) => {
        setOperations(
          produce((o) => {
            const operation = o.find((o) => o.id === operationId);
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
            const operation = o.find((o) => o.id === operationId);
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
