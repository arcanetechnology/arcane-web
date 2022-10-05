/** @format */

import { useLazyGetCustodiesQuery } from '@/services';
import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import * as React from 'react';
import { CustodyAccount } from '@/types';
import {
  Controller,
  Control,
  RegisterOptions,
  FieldValue,
  FieldValues,
  Path,
  PathValue,
} from 'react-hook-form';

interface CustodyDropDownProps<T extends FieldValues> {
  name: Path<T>;
  defaultValue: PathValue<T, Path<T>>;
  control: Control<T, any>;
  rule?: RegisterOptions;
}

const CustodyDropDown = <T extends FieldValues>({
  name,
  defaultValue,
  control,
  rule = {},
}: CustodyDropDownProps<T>) => {
  const [getCustodies, { data: custodies = [], isFetching, isLoading }] =
    useLazyGetCustodiesQuery();
  return (
    <Controller
      name={name}
      rules={rule}
      defaultValue={defaultValue}
      control={control}
      render={({ field }) => (
        <Autocomplete
          loading={isLoading || isFetching}
          options={custodies}
          onOpen={async () => {
            await getCustodies().unwrap();
          }}
          // @ts-ignore
          getOptionLabel={(custody) => custody.alias ?? custody}
          {...field}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Custody Account Id"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {isLoading || isFetching ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              }}
            />
          )}
        />
      )}
    />
  );
};

export default CustodyDropDown;
