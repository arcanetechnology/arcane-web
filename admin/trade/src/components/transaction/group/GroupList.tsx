/** @format */

import { currencyGroupsSelector, useTradeSelector } from '../../../state';
import { DataGrid, GridColumns } from '@mui/x-data-grid';
import * as React from 'react';
import { CurrencyGroup } from '../../../types';
import { GridLinkAction } from '../../navigation';
import { Edit } from '@mui/icons-material';

type GroupListProps = {
  groups: Array<string>;
};
const GroupList: React.FC<GroupListProps> = ({ groups }) => {
  const transactionGroups = useTradeSelector((s) => {
    const allGroups = currencyGroupsSelector.selectAll(s);
    return allGroups.filter((g) => groups.includes(g.id));
  });

  const columns = React.useMemo<GridColumns<CurrencyGroup>>(
    () => [
      {
        field: 'id',
        headerName: 'ID',
        flex: 0.5,
        minWidth: 50,
        hide: true,
      },
      {
        field: 'currency',
        headerName: 'Currency',
        flex: 1,
        minWidth: 300,
      },
      {
        field: 'operations',
        headerName: 'Operations',
        flex: 1,
        minWidth: 300,
        renderCell: (params) => {
          return `${params.value.length} operations`;
        },
      },
      {
        field: 'actions',
        type: 'actions',
        minWidth: 350,
        getActions: (params) => [
          <GridLinkAction
            icon={<Edit />}
            to={params.id as string}
            label="Edit"
          />,
        ],
      },
    ],
    [transactionGroups]
  );

  return (
    <div style={{ height: 600, width: '100%' }}>
      <DataGrid rows={transactionGroups} columns={columns} />
    </div>
  );
};

export default GroupList;
