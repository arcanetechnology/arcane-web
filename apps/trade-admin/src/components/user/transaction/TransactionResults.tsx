/** @format */

import { For, VoidComponent } from 'solid-js';
import Fuse from 'fuse.js';

import { SearchAbleAccounts } from './Transaction.types';

type TransactionResultsProps = {
  results: Array<Fuse.FuseResult<SearchAbleAccounts>>;
};

const TransactionResults: VoidComponent<TransactionResultsProps> = (props) => {
  return (
    <div class="align-vertical">
      <table>
        <tbody>
          <For each={props.results}>
            {(r) => (
              <tr >
                <td>{r.item.profileAlias}</td>
                <td>{r.item.profileType}</td>
                <td>{r.item.accountAlias}</td>
                <td>{r.item.accountCurrency}</td>
                <td>{r.item.portfolioAlias}</td>
                <td>{r.item.cryptoAlias}</td>
                <td>{r.item.cryptoCurrency}</td>
              </tr>
            )}
          </For>
        </tbody>
      </table>
    </div>
  );
};

export default TransactionResults;
