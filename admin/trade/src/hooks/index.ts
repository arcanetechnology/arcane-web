/** @format */

import {
  currencyGroupsSelector,
  operationsSelector,
  transactionsSelector,
  useTradeSelector,
} from '@/state';
import { AccountOption, Operation } from '@/types';

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
      return groups.filter((g) => g.operations.includes(o.id));
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

export const useCustodyPopulate = (
  accountOptions: AccountOption[],
  operations: Operation[]
): Record<string, Array<{ account: string; amount: number }>> => {
  // TODO @joel
  // Operation := accountId + amount
  // Lookup Account from accountOptions using accountId
  // Operation := AccountOption + amount
  // create a record to be returned
  // for every operation in operations
  //    // if account is stakeholder account
  //    if operation.accountOption.custodyAccountId != null
  //        if record[operation.accountOption.custodyAccountId] is undefined
  //            record[operation.accountOption.custodyAccountId] = 0
  //        record[operation.accountOption.custodyAccountId] += amount
  // for entry in record
  //    if entry.value == 0
  //        record.remove(entry.key)
  // return record
  const custody = operations.reduce((prev, curr, index) => {
    const acc = accountOptions.find(
      (a) => curr.account === a.id
    ) as AccountOption;

    if (acc.custodyAccountId) {
      const custodyAcc = { account: acc.custodyAccountId, amount: curr.amount };
      const custody = prev[acc.currency];

      if (custody) {
        return {
          ...prev,
          [acc.currency]: [...custody, custodyAcc],
        };
      }
      return {
        ...prev,
        [acc.currency]: [custodyAcc],
      };
    }
    return { ...prev };
  }, {} as Record<string, Array<{ account: string; amount: number }>>);
  return custody;
};

export const useZeroSum = (
  accountOptions: AccountOption[],
  operations: Operation[]
) => {};
