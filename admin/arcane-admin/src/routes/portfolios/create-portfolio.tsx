/** @format */

import { PortfolioForm } from '@/components';
import { GAP } from '@/constants';
import { useAddPortfolioMutation } from '@/services';
import { AccountPath, CreatePortfolioForm } from '@/types/frontend';
import { Stack } from '@mui/system';
import * as React from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const CreatePortfolio: React.FC = () => {
  const params = useParams<AccountPath>();
  const [addPortfolio] = useAddPortfolioMutation();

  const handleSubmit = async (portfolio: CreatePortfolioForm) => {
    try {
      await addPortfolio({ ...(params as AccountPath), ...portfolio }).unwrap();
    } catch (err) {
      toast('error in creating portfolios');
    }
  };
  return (
    <Stack gap={GAP}>
      <PortfolioForm handleSubmit={handleSubmit} />
    </Stack>
  );
};

export default CreatePortfolio;
