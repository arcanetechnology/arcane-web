/** @format */

import { Profile } from '../../../types';
import { createSignal, onMount, VoidComponent, For } from 'solid-js';
import { SearchAbleAccounts } from './Transaction.types';
import Transaction from './Transaction';
import { Button } from '@arcane-web/alchemy-solid';
import { useOperations } from './Operations';

type TransactionProps = {
  profiles: Array<Profile>;
};

const normalizeAccounts = (profiles: Profile[]): Array<SearchAbleAccounts> => {
  return profiles.flatMap((profile) =>
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
};
const Transactions: VoidComponent<TransactionProps> = (props) => {
  const [initialData, setInitialData] = createSignal<Array<SearchAbleAccounts>>(
    []
  );

  const [
    operations,
    { addOperations, removeOperation, addTransaction, deleteTransaction },
  ] = useOperations();

  onMount(() => {
    setInitialData(normalizeAccounts(props.profiles));
  });

  return (
    <div class="margin-48">
      <div class="align-horizontal gap-small">
        <Button onClick={addOperations} variant="primary">
          Add Operation
        </Button>
      </div>
      <div class="margin-16">
        <For each={operations}>
          {(o) => (
            <div class="margin-8">
              <div class="align-horizontal gap-small">
                <Button
                  onClick={() => removeOperation(o.id)}
                  size="small"
                  variant="secondary"
                >
                  Delete Operation
                </Button>
                <Button onClick={() => addTransaction(o.id)} variant="primary">
                  Add Transaction
                </Button>
              </div>
              <div class="margin-2">
                <For each={o.transactions}>
                  {(t) => (
                    <div class="align-horizontal gap-small">
                      <Transaction accounts={initialData()} />
                      <Button
                        onClick={() => deleteTransaction(o.id, t.id)}
                        size="small"
                        variant="secondary"
                      >
                        Delete Transaction
                      </Button>
                    </div>
                  )}
                </For>
              </div>
            </div>
          )}
        </For>
      </div>
    </div>
  );
};

export default Transactions;
