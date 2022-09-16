/** @format */

import * as React from 'react';
import { DataGrid, GridColumns } from '@mui/x-data-grid';
import { RemoveRedEye } from '@mui/icons-material';
import { User } from '@/types';
import { GridLinkAction } from '../navigation';
import { useGetUsersQuery } from '@/services/users';
import { LoadingOverlay, NoRowsOverlays } from '../overlays';
import CreateUser from './CreateUser';

const UserList: React.FC = () => {
  const { data: users = [], isLoading } = useGetUsersQuery();
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
            to={params.id as string}
            label="View"
          />,
        ],
      },
    ],
    [isLoading, users]
  );

  return (
    <div style={{ height: 600, width: '100%' }}>
      <DataGrid
        loading={isLoading}
        density="comfortable"
        autoPageSize
        hideFooter={!isLoading}
        components={{
          NoRowsOverlay: () => (
            <NoRowsOverlays>
              <CreateUser />
            </NoRowsOverlays>
          ),
          LoadingOverlay: LoadingOverlay,
        }}
        rows={users}
        columns={columns}
      />
    </div>
  );
};

export default UserList;
