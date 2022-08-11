/** @format */

import { VoidComponent, For } from 'solid-js';
import Transaction from './Transaction';
import { Button } from '@arcane-web/alchemy-solid';
import { useOperations } from './Operations';

const Transactions: VoidComponent = () => {
  const [
    operations,
    { addOperations, removeOperation, addTransaction, deleteTransaction },
  ] = useOperations();

  return (
    <div class="margin-48">
      <div class="align-horizontal gap-small">
        <Button onClick={addOperations} variant="primary">
          Add Operation
        </Button>
      </div>
      <div class="margin-16">
        <For each={operations.operations}>
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
                      <Transaction accounts={operations.accounts} />
                      <div class="align-vertical">
                        <Button
                          onClick={() => deleteTransaction(o.id, t.id)}
                          size="small"
                          variant="secondary"
                        >
                          Delete
                        </Button>
                      </div>
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
