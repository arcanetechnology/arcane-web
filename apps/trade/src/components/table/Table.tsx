/** @format */
import { For } from 'solid-js';
import { Index, Row, Column } from './Table.types';

type TableProps<K extends Index> = {
  columns: Array<Column<K>>;
  rows: Array<Row<K>>;
  getRowId: (row: Row<K>) => string;
};

export function Table<I extends Index = Index>(props: TableProps<I>) {
  return (
    <table class="arcane-table">
      <thead>
        <tr>
          <For each={props.columns}>
            {(column) => {
              return (
                <th>
                  <div>{column.label ?? column.id}</div>
                </th>
              );
            }}
          </For>
        </tr>
      </thead>
      <tbody>
        <For each={props.rows}>
          {(row) => {
            const id = props.getRowId(row);
            return (
              <tr id={id}>
                <For each={props.columns}>
                  {(column) => <td>{renderBody(row, column.id)}</td>}
                </For>
              </tr>
            );
          }}
        </For>
      </tbody>
    </table>
  );
}

const stringify = (value: any) => {
  if (typeof value === 'string') {
    return value;
  } else {
    return JSON.stringify(value);
  }
};

const renderBody = <I extends Index>(row: Row<I>, id: I) => {
  if (typeof row === 'object') {
    return stringify(row[id]);
  } else {
    return stringify(row);
  }
};
