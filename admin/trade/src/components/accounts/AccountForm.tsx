/** @format */

import * as React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { GAP } from '@/constants';
import { Box } from '@mui/system';

type AccountFormProps = {
  handleSubmit: () => void;
};

const AccountForm: React.FC<AccountFormProps> = ({ handleSubmit }) => {
  return <Box component="form" gap={GAP}></Box>;
};

export default AccountForm;
