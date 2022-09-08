/** @format */

import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootState, usersSelector } from '../../state';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import { RemoveRedEye } from '@mui/icons-material';
import { User } from '../../types';

const UserList: React.FC = () => {
  const users = useSelector(usersSelector.selectAll);
  const isLoading = useSelector((s: RootState) => s.users.loading);

  const columns: GridColDef<User>[] = [
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
      field: 'action',
      headerName: 'Actions',
      renderCell: (params: GridRenderCellParams) => (
        <IconButton>
          <RemoveRedEye />
        </IconButton>
      ),
      flex: 0.5,
      minWidth: 50,
    },
  ];

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
