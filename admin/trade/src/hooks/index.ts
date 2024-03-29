/** @format */

import {
  currencyGroupsSelector,
  operationsSelector,
  transactionsSelector,
  useTradeSelector,
} from '@/state';
import {
  AccountOption,
  CurrencyGroup,
  Transaction,
  Operation,
  UserTransaction,
} from '@/types';

export * from './useEventListener';

export const useTransactionData = (transactionId: string) => {
  const transaction = useTradeSelector((s) =>
    transactionsSelector.selectById(s, transactionId)
  );
  const groups = useTradeSelector((s) => {
    const gs = currencyGroupsSelector.selectAll(s);
    return gs.filter((g) => transaction?.groups.includes(g.id));
  });

  const operations = useTradeSelector((s) => {
    const os = operationsSelector.selectAll(s);

    return os.filter((o) => {
      const groupOperations = groups.flatMap((g) => g.operations);
      return groupOperations.includes(o.id);
    });
  });

  return { transaction, groups, operations };
};

export const useGroupData = (groupId: string) => {
  const group = useTradeSelector((s) => {
    return currencyGroupsSelector.selectById(s, groupId);
  });

  const operations = useOperationsData(group?.operations ?? []);
  return { group, operations };
};

export const useOperationsData = (operationIds: Array<string>) => {
  const allOperations = useTradeSelector(operationsSelector.selectAll);
  return allOperations.filter((o) => operationIds.includes(o.id));
};

// record of custody account id and amount
type CustodyAccountOperation = Record<string, number>;

// record of all possible group id and custody account operation.
type CustodyAccountOperations = Record<string, CustodyAccountOperation>;

export const useCustodyPopulate = (
  accountOptions: AccountOption[],
  operations: Operation[]
): CustodyAccountOperations => {
  const custody = operations.reduce(
    (custodyAccountOperations, currOperation, index) => {
      const acc = accountOptions.find(
        (a) => currOperation.account === a.id
      ) as AccountOption;

      if (acc.custodyAccountId) {
        const currencyCustodyAccountOperations =
          custodyAccountOperations[acc.currency];

        // todo check new custody with old
        if (currencyCustodyAccountOperations) {
          const previousSum =
            currencyCustodyAccountOperations[acc.custodyAccountId] ?? 0;

          const sumAmount = previousSum + currOperation.amount;

          if (sumAmount === 0) {
            delete currencyCustodyAccountOperations[acc.custodyAccountId];
            return {
              ...custodyAccountOperations,
              [acc.currency]: currencyCustodyAccountOperations,
            };
          }

          return {
            ...custodyAccountOperations,
            [acc.currency]: {
              ...currencyCustodyAccountOperations,
              [acc.custodyAccountId]: sumAmount,
            },
          };
        }
        return {
          ...custodyAccountOperations,
          [acc.currency]: {
            [acc.custodyAccountId]: currOperation.amount,
          },
        };
      }
      return custodyAccountOperations;
    },
    {} as CustodyAccountOperations
  );
  return custody;
};

export const useZeroSum = (operations: Operation[]) => {
  return operations.reduce(
    (sum, currOperation) => sum + currOperation.amount,
    0
  );
};
