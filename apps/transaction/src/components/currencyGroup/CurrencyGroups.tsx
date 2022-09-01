/** @format */

import * as React from 'react';
import { Alert, AlertTitle } from '@mui/material';
import { useSelector } from 'react-redux';
import { currencyGroupsSelector } from '../../state';
import CurrencyGroup from './CurrencyGroup';

const CurrencyGroups: React.FC = () => {
  const currencyGroups = useSelector(currencyGroupsSelector.selectAll);

  const alert = (
    <Alert severity="info" sx={{ width: 300, margin: 'auto' }}>
      <AlertTitle>Info</AlertTitle>
      No Currency Groups Defined!
    </Alert>
  );

  if (!(currencyGroups.length > 0)) {
    return alert;
  }

  return (
    <React.Fragment>
      {currencyGroups.map((c) => (
        <CurrencyGroup key={c.id} {...c} />
      ))}
    </React.Fragment>
  );
};

export default CurrencyGroups;
