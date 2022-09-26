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
  Typography,
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

  if (users.length === 0)
    return (
      <Box
        component={Paper}
        elevation={0}
        height="100%"
        sx={{ margin: '0 auto' }}
      >
        <Typography variant="h6">
          <i>No User</i>
        </Typography>
      </Box>
    );

  return (
    <Box component={Paper} elevation={0} height="100%">
      <InfiniteLoader
        isItemLoaded={(index) => index < users.length}
        itemCount={100}
        loadMoreItems={loadMore}
      >
        {({ onItemsRendered, ref }) => (
          <FixedSizeList
            height={200}
            width={'inherit'}
            itemCount={itemCount}
            itemSize={60}
            className="list-container"
            onItemsRendered={onItemsRendered}
            ref={ref}
          >
            {({ index, style }) => {
              const user = users[index];
              return (
                <NavigationLink
                  to={user.id + '/profiles'}
                  primary={user.email === '' ? 'No Email' : user.email}
                />
              );
            }}
          </FixedSizeList>
        )}
      </InfiniteLoader>
    </Box>
  );
};

export default UsersList;
