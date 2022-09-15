/** @format */

import { Delete, RemoveRedEye } from '@mui/icons-material';
import { DataGrid, GridActionsCellItem, GridColumns } from '@mui/x-data-grid';
import * as React from 'react';
import { toast } from 'react-toastify';
import {
  transactionDeleted,
  useTradeDispatch,
  transactionsSelector,
  useTradeSelector,
} from '@/state';
import { UserTransaction } from '@/types';
import { GridLinkAction } from '../navigation';

const TransactionList: React.FC = () => {
  const transactions = useTradeSelector(transactionsSelector.selectAll);
  const dispatch = useTradeDispatch();
  const columns = React.useMemo<GridColumns<UserTransaction>>(
    () => [
      {
        field: 'id',
        headerName: 'ID',
        flex: 0.5,
        minWidth: 50,
      },
      {
        field: 'name',
        headerName: 'Name',
        flex: 1,
        minWidth: 300,
      },
      {
        field: 'groups',
        headerName: 'Groups',
        flex: 1,
        minWidth: 300,
        renderCell: (params) => {
          return `${params.value.length} currency groups`;
        },
      },
      {
        field: 'status',
        headerName: 'Status',
        flex: 1,
        minWidth: 300,
      },
      {
        field: 'actions',
        type: 'actions',
        flex: 1,
        getActions: (params) => [
          <GridLinkAction
            icon={<RemoveRedEye />}
            to={params.id as string}
            label="View"
          />,
          <GridActionsCellItem
            icon={<Delete />}
            onClick={() => {
              if (params.row['status'] === 'draft') {
                dispatch(transactionDeleted(params.id));
              } else {
                toast('cannot delete a published transaction');
              }
            }}
            label="Delete"
          />,
        ],
      },
    ],
    [transactions]
  );

  return (
    <div style={{ height: 600, width: '100%' }}>
      <DataGrid rows={transactions} columns={columns} />
    </div>
  );
};

export default TransactionList;
