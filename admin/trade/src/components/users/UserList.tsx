/** @format */

import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootState, usersSelector } from '../../state';
import { DataGrid, GridColumns } from '@mui/x-data-grid';
import { RemoveRedEye } from '@mui/icons-material';
import { User } from '../../types';
import { GridLinkAction } from '../navigation';

const UserList: React.FC = () => {
  const users = useSelector(usersSelector.selectAll);
  const isLoading = useSelector((s: RootState) => s.users.loading);

  const columns = React.useMemo<GridColumns<User>>(
    () => [
      {
        field: 'id',
        headerName: 'ID',
        flex: 0.5,
        minWidth: 50,
      },
      {
        field: 'email',
        headerName: 'Email',
        flex: 1,
        minWidth: 300,
      },
      {
        field: 'actions',
        type: 'actions',
        getActions: (params) => [
          <GridLinkAction
            icon={<RemoveRedEye />}
            to={('/user/' + params.id) as string}
            label="View"
          />,
        ],
      },
    ],
    [isLoading, users]
  );

  return (
    <div style={{ height: 500, width: '100%' }}>
      <DataGrid<User>
        loading={isLoading === 'loading'}
        rows={users}
        columns={columns}
      />
    </div>
  );
};

export default UserList;
