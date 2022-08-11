/** @format */

import { createSignal, Show, VoidComponent, For, createEffect } from 'solid-js';
import SearchAccounts from './SearchAccounts';
import Fuse from 'fuse.js';
import { searchConfig } from './config';
import { SearchAbleAccounts } from './Transaction.types';
import TransactionResults from './TransactionResults';
import { Input, Button } from '@arcane-web/alchemy-solid';

type TransactionProps = {
  accounts: Array<SearchAbleAccounts>;
};

const Transaction: VoidComponent<TransactionProps> = (props) => {
  const [result, setResult] =
    createSignal<Array<Fuse.FuseResult<SearchAbleAccounts>>>();
  const [isSearching, toggleSearchBox] = createSignal(true);
  const fuse = new Fuse([], searchConfig);

  createEffect(() => {
    fuse.setCollection(props.accounts);
  });

  const searchChange = (e) => {
    setResult(fuse.search(e.target.value));
  };

  return (
    <div>
      <form class="align-horizontal gap-small">
        <SearchAccounts
          id="search-accounts"
          onFocus={toggleSearchBox}
          onChange={searchChange}
          name={'transaction-search'}
        />
        <Input name="amount" placeholder="Amount" />
        <Input disabled name="currency" placeholder="Currency" />
      </form>
      <Show when={isSearching()}>
        <div class="margin-16">
          <Show
            when={result() && result().length > 0}
            fallback={
              <table>
                <tbody>
                  <For each={props.accounts}>
                    {(r) => (
                      <tr style={{ padding: '2px' }}>
                        <td>{r.profileAlias}</td>
                        <td>{r.profileType}</td>
                        <td>{r.accountAlias}</td>
                        <td>{r.accountCurrency}</td>
                        <td>{r.portfolioAlias}</td>
                        <td>{r.cryptoAlias}</td>
                        <td>{r.cryptoCurrency}</td>
                      </tr>
                    )}
                  </For>
                </tbody>
              </table>
            }
          >
            <TransactionResults results={result()} />
          </Show>
        </div>
      </Show>
    </div>
  );
};

export default Transaction;

// TODO: array of accounts
