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
  IconButton,
  Card,
  CardContent,
  Stack,
  Switch,
  Grid,
  ToggleButtonGroup,
  ToggleButton,
  InputBase,
  Paper,
  Divider,
  InputAdornment,
} from '@mui/material';
import { profileTypes } from '@/types/backend';
import { Add, BusinessCenter, Person } from '@mui/icons-material';

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
    <Card elevation={0}>
      <CardContent
        id="create-user-form"
        component="form"
        onSubmit={onSubmit(handleSubmit)}
        sx={{ display: 'flex' }}
      >
        <FormControl required component="fieldset">
          <Controller
            rules={{ required: true }}
            control={control}
            aria-labelledby="profile-type-radio-button-group"
            name="type"
            render={({ field }) => (
              <RadioGroup row {...field} sx={{ minWidth: 300 }}>
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
        <TextField
          size="medium"
          label="Alias"
          required
          {...register('alias')}
          fullWidth
          InputLabelProps={{}}
          InputProps={{
            sx: {
              borderRadius: 3,
            },
            endAdornment: (
              <IconButton type="submit">
                <Add />
              </IconButton>
            ),
          }}
        />
      </CardContent>
    </Card>
  );
};

export default ProfileForm;
