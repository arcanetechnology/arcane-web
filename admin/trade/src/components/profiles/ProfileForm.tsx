/** @format */

import * as React from 'react';
import { Box } from '@mui/system';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CreateProfileForm } from '@/types/frontend';
import { useForm, Controller } from 'react-hook-form';
import { GAP } from '@/constants';
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Button,
} from '@mui/material';
import { profileTypes } from '@/types/backend';

const schema = z.object({
  type: z.enum(profileTypes),
  alias: z.string().nonempty('please specify a label for your profile'),
});

type ProfileFormProps = {
  handleSubmit: (data: CreateProfileForm) => void;
};

const ProfileForm: React.FC<ProfileFormProps> = ({ handleSubmit }) => {
  const {
    register,
    handleSubmit: onSubmit,
    control,
  } = useForm<CreateProfileForm>({
    resolver: zodResolver(schema as any),
    defaultValues: {
      type: 'BUSINESS',
    },
  });
  return (
    <Box
      id="create-user-form"
      display="flex"
      flexDirection="column"
      gap={GAP}
      component="form"
      onSubmit={onSubmit(handleSubmit)}
    >
      <FormControl required component="fieldset">
        <FormLabel id="profile-type-radio-button-group" component="legend">
          Profile Type
        </FormLabel>
        <Controller
          rules={{ required: true }}
          control={control}
          aria-labelledby="profile-type-radio-button-group"
          name="type"
          render={({ field }) => (
            <RadioGroup row {...field}>
              <FormControlLabel
                value="BUSINESS"
                control={<Radio />}
                label="Business"
              />
              <FormControlLabel
                value="PERSONAL"
                control={<Radio />}
                label="Personal"
              />
            </RadioGroup>
          )}
        />
      </FormControl>
      <TextField label="Alias" required {...register('alias')} />
      <Box gap={GAP} display="flex" flexDirection="row">
        <Button type="submit" variant="contained">
          Submit
        </Button>
        <Button type="reset">Reset</Button>
      </Box>
    </Box>
  );
};

export default ProfileForm;
