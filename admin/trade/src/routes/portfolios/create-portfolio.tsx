/** @format */

import { PortfolioForm } from '@/components';
import { GAP } from '@/constants';
import { AccountPath, CreatePortfolioForm } from '@/types/frontend';
import { Stack } from '@mui/system';
import * as React from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const CreatePortfolio: React.FC = () => {
  const params = useParams<AccountPath>();

  const handleSubmit = async (portfolio: CreatePortfolioForm) => {};
  return (
    <Stack gap={GAP}>
      <PortfolioForm handleSubmit={handleSubmit} />
    </Stack>
  );
};

export default CreatePortfolio;
