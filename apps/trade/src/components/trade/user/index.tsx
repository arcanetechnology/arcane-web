/** @format */

import { createResource, VoidComponent } from 'solid-js';
import { Table } from '../../table/Table';

const fetchUsers = async () => (await fetch('/users')).json();

const Users: VoidComponent = () => {
  const [users] = createResource(fetchUsers);

  return (
    <div>
      <Table
        rows={users()}
        columns={[
          { id: 'userId', label: 'User Id' },
          { id: 'createdOn', label: 'Created On' },
        ]}
        getRowId={(r) => `${r['userId']}`}
      />
    </div>
  );
};

export default Users;
