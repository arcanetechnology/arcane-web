/** @format */

import { Box } from '@mui/material';
import * as React from 'react';
import {
  operationDeleted,
  useTransactionDispatch,
  sectionOperationDeleted,
} from '../state';
import { Section as SectionType } from '../types';
import Operation from './Operation';

const Section: React.FC<SectionType> = ({ id, operations }) => {
  const dispatch = useTransactionDispatch();

  const deleteOperation = (operation: string) => {
    dispatch(operationDeleted(operation));
    dispatch(sectionOperationDeleted({ id, operation: operation }));
  };

  return (
    <Box m={2} gap={2} flexDirection={'column'}>
      {operations.map((o) => (
        <Operation key={o} id={o} deleteOperation={deleteOperation} />
      ))}
    </Box>
  );
};

export default Section;
