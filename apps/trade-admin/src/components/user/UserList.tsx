/** @format */

import { createSignal, For, VoidComponent, createEffect } from 'solid-js';
import { User, Users } from '../../types';
import {
  flexRender,
  getCoreRowModel,
  ColumnDef,
  createSolidTable,
} from '@tanstack/solid-table';
import { Link } from '@solidjs/router';

type UserListProps = {
  users: Users;
};

const defaultColumns: ColumnDef<User>[] = [
  {
    accessorKey: 'id',

    cell: (info) => info.getValue(),
  },
  {
    accessorFn: (row) => row.email,
    id: 'email',
    cell: (info) => <i>{info.getValue<string>()}</i>,
    header: () => <span>Email</span>,
  },
  {
    id: 'action',
    cell: (info) => {
      return <Link href={`${info.row.getValue('id')}`}>More</Link>;
    },
    header: () => <span>Action</span>,
  },
];

const UserList: VoidComponent<UserListProps> = (props) => {
  const table = createSolidTable({
    data: props.users,
    columns: defaultColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <table>
        <thead>
          <For each={table.getHeaderGroups()}>
            {(headerGroup) => (
              <tr>
                <For each={headerGroup.headers}>
                  {(header) => (
                    <th
                      style={{
                        'text-align': 'left',
                      }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  )}
                </For>
              </tr>
            )}
          </For>
        </thead>
        <tbody>
          <For each={table.getRowModel().rows}>
            {(row) => (
              <tr>
                <For each={row.getVisibleCells()}>
                  {(cell) => (
                    <td>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  )}
                </For>
              </tr>
            )}
          </For>
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
