/** @format */

import {
  accountsSelector,
  currencyGroupsSelector,
  getOperationsData,
  operationsSelector,
  transactionsSelector,
  useTradeSelector,
} from '../state';

export * from './useEventListener';

export const useTransactionData = (transactionId: string) => {
  const accounts = useTradeSelector(accountsSelector.selectAll);
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

  return { accounts, transaction, groups, operations };
};

export const useGroupData = (groupId: string) => {
  const accounts = useTradeSelector(accountsSelector.selectAll);
  const group = useTradeSelector((s) => {
    return currencyGroupsSelector.selectById(s, groupId);
  });

  const operations = useOperationsData(group?.operations ?? []);
  return { accounts, group, operations };
};

export const useOperationsData = (operationIds: Array<string>) => {
  const allOperations = useTradeSelector(operationsSelector.selectAll);
  return allOperations.filter((o) => operationIds.includes(o.id));
};
