/** @format */

import { TextField, Autocomplete, Box } from '@mui/material';
import * as React from 'react';
import { getAccounts } from '../state';
import { useForm } from 'react-hook-form';

type OperationFormProps = {
  accounts: string[];
};

const OperationForm: React.FC<OperationFormProps> = ({ accounts }) => {
  const accountDatas = getAccounts(accounts);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  console.log(watch('account'));

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box display={'flex'} flexDirection={'row'} gap={2} alignItems="center">
        <Autocomplete
          size="small"
          options={accountDatas.map((a) => a.label)}
          id="account"
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField
              {...params}
              {...(register('account'), { required: true })}
              label="Accounts"
            />
          )}
        />
        <TextField
          required
          size="small"
          label="Amount"
          {...register('amount', { required: true })}
        />
      </Box>
    </form>
  );
};

export default OperationForm;

// export default function FreeSoloCreateOption() {
//   const [value, setValue] = React.useState<FilmOptionType | null>(null);

//   return (
//     <Autocomplete
//       value={value}
//       onChange={(event, newValue) => {
//         if (typeof newValue === 'string') {
//           setValue({
//             title: newValue,
//           });
//         } else if (newValue && newValue.inputValue) {
//           // Create a new value from the user input
//           setValue({
//             title: newValue.inputValue,
//           });
//         } else {
//           setValue(newValue);
//         }
//       }}
//       filterOptions={(options, params) => {
//         const filtered = filter(options, params);

//         const { inputValue } = params;
//         // Suggest the creation of a new value
//         const isExisting = options.some((option) => inputValue === option.title);
//         if (inputValue !== '' && !isExisting) {
//           filtered.push({
//             inputValue,
//             title: `Add "${inputValue}"`,
//           });
//         }

//         return filtered;
//       }}
//       selectOnFocus
//       clearOnBlur
//       handleHomeEndKeys
//       id="free-solo-with-text-demo"
//       options={top100Films}
//       getOptionLabel={(option) => {
//         // Value selected with enter, right from the input
//         if (typeof option === 'string') {
//           return option;
//         }
//         // Add "xxx" option created dynamically
//         if (option.inputValue) {
//           return option.inputValue;
//         }
//         // Regular option
//         return option.title;
//       }}
//       renderOption={(props, option) => <li {...props}>{option.title}</li>}
//       sx={{ width: 300 }}
//       freeSolo
//       renderInput={(params) => (
//         <TextField {...params} label="Free solo with text demo" />
//       )}
//     />
//   );
// }
