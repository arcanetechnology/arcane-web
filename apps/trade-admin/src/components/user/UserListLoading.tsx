/** @format */

import { For, VoidComponent } from 'solid-js';

const UserListLoading: VoidComponent = () => {
  return (
    <For each={Array.from(Array(6))}>
      {() => (
        <h2
          style={{
            background: '#E2E2E2',
            width: '100%',
            height: '20px',
            margin: '10px',
            'border-radius': '5px',
          }}
        />
      )}
    </For>
  );
};

export default UserListLoading;
