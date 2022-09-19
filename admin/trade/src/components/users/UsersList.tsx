/** @format */

import { User } from '@/types/backend';
import { Optional } from '@/types/util';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  Paper,
} from '@mui/material';
import * as React from 'react';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import { NavigationLink } from '../navigation';

function renderRow(props: ListChildComponentProps) {
  const { index, style } = props;
  console.log(props);

  return (
    <ListItem style={style} key={index} component="div" disablePadding>
      <ListItemButton>
        <ListItemText primary={`Item ${index + 1}`} />
      </ListItemButton>
    </ListItem>
  );
}

type UsersListProps = {
  users: Array<Optional<User, 'profiles'>>;
  hasNextPage: boolean;
  loadMore: () => void;
};

const UsersList: React.FC<UsersListProps> = ({
  users,
  hasNextPage,
  loadMore,
}) => {
  const itemCount = hasNextPage ? users.length + 1 : users.length;
  return (
    <Box component={Paper} elevation={0} height="100%">
      <InfiniteLoader
        isItemLoaded={(index) => index < users.length}
        itemCount={100}
        loadMoreItems={loadMore}
      >
        {({ onItemsRendered, ref }) => (
          <FixedSizeList
            height={700}
            width={'inherit'}
            itemCount={itemCount}
            itemSize={60}
            className="list-container"
            onItemsRendered={onItemsRendered}
            ref={ref}
          >
            {({ index, style }) => (
              <NavigationLink
                to={'users/' + users[index].id}
                primary={users[index].email}
              />
            )}
          </FixedSizeList>
        )}
      </InfiniteLoader>
    </Box>
  );
};

export default UsersList;
