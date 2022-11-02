/** @format */

import { StakeholderCryptoAccounts, StakeholderFiatAccounts } from '@/types';
import {
  Controller,
  Control,
  RegisterOptions,
  FieldValue,
  FieldValues,
  Path,
  PathValue,
} from 'react-hook-form';
import * as React from 'react';
import { Autocomplete, CircularProgress, TextField } from '@mui/material';

interface AccountsAutoCompleteProps<T extends FieldValues> {
  accounts: StakeholderFiatAccounts | StakeholderCryptoAccounts;
  name: Path<T>;
  defaultValue: PathValue<T, Path<T>>;
  control: Control<T, any>;
  rule?: RegisterOptions;
  isLoading: boolean;
}

/**
 * component that aggregates all accouns and shows it as an autocomplete element.
 * @param param0
 * @returns
 */
const AccountsAutoComplete = <T extends FieldValues>({
  accounts,
  name,
  defaultValue,
  control,
  rule = {},
  isLoading = false,
}: AccountsAutoCompleteProps<T>) => {
  return (
    <Controller
      name={name}
      rules={rule}
      defaultValue={defaultValue}
      control={control}
      render={({ field }) => (
        <Autocomplete
          options={accounts}
          loading={isLoading}
          // @ts-ignore
          getOptionLabel={(account) => account.alias ?? account}
          fullWidth
          {...field}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Account Id"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {isLoading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              }}
            />
          )}
          onChange={(e, v) => {
            // @ts-ignore
            field.onChange(v.id);
          }}
        />
      )}
    />
  );
};

export default AccountsAutoComplete;
