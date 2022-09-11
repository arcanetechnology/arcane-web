/** @format */

import {
  currencyGroupOperationDeleted,
  operationDeleted,
  operationsSelector,
  useTradeDispatch,
  useTradeSelector,
} from '../../../state';
import { DataGrid, GridActionsCellItem, GridColumns } from '@mui/x-data-grid';
import * as React from 'react';
import { CurrencyGroup, Operation, Status } from '../../../types';
import { Delete } from '@mui/icons-material';

type OperationListProps = {
  status: Status;
  group: CurrencyGroup;
};

const OperationList: React.FC<OperationListProps> = ({ group, status }) => {
  const groupOperation = useTradeSelector((s) => {
    const allOperations = operationsSelector.selectAll(s);
    return allOperations.filter((o) => group.operations.includes(o.id));
  });

  const dispatch = useTradeDispatch();

  const columns = React.useMemo<GridColumns<Operation>>(
    () => [
      {
        field: 'id',
        headerName: 'ID',
        flex: 0.5,
        minWidth: 50,
        hide: true,
      },
      {
        field: 'account',
        headerName: 'Account',
        flex: 1,
        minWidth: 300,
      },
      {
        field: 'amount',
        headerName: 'Amount',
        flex: 1,
        minWidth: 300,
      },
      {
        field: 'actions',
        type: 'actions',
        minWidth: 350,
        flex: 1,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<Delete />}
            disabled={status !== 'draft'}
            onClick={() => {
              dispatch(
                currencyGroupOperationDeleted({
                  id: group.id,
                  operation: params.id as string,
                })
              );
              dispatch(operationDeleted(params.id));
            }}
            label="Edit"
          />,
        ],
      },
    ],
    [groupOperation]
  );

  return (
    <div style={{ height: 600, width: '100%' }}>
      <DataGrid rows={groupOperation} columns={columns} />
    </div>
  );
};

export default OperationList;
