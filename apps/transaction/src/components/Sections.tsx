/** @format */

import { Skeleton } from '@mui/material';
import * as React from 'react';
import { useSelector } from 'react-redux';
import {
  accountsSelector,
  fetchUserAccounts,
  operationAdded,
  RootState,
  sectionAdded,
  sectionsSelector,
  useTransactionDispatch,
} from '../state';
import Section from './Section';
import { toast } from 'react-toastify';
import { nanoid } from '@reduxjs/toolkit';

const Sections: React.FC = () => {
  const sections = useSelector(sectionsSelector.selectAll);
  const isLoading = useSelector((s: RootState) => s.accounts.loading);

  const dispatch = useTransactionDispatch();

  React.useEffect(() => {
    toast('fetching user accounts', { hideProgressBar: true, autoClose: 60 });
    dispatch(fetchUserAccounts('user1'));
  }, []);

  React.useEffect(() => {
    // add a section and an operation by default
    if (isLoading === 'fetched') {
      const sectionId = nanoid();
      const operation = nanoid();
      dispatch(
        operationAdded({
          id: operation,
          status: 'draft',
          account: '',
          amount: 0,
        })
      );
      dispatch(sectionAdded({ id: sectionId, operations: [operation] }));
    }
  }, [isLoading]);

  return (
    <React.Fragment>
      {isLoading === 'loading' ? (
        <Skeleton animation="wave" height={60} />
      ) : (
        <React.Fragment>
          {sections.map((s) => (
            <Section key={s.id} {...s} />
          ))}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Sections;
