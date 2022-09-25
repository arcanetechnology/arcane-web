/** @format */

import { CryptoForm } from '@/components';
import { GAP } from '@/constants';
import { useAddCryptoMutation } from '@/services';
import { CreateCryptoForm, PortfolioPath } from '@/types/frontend';
import { Stack } from '@mui/system';
import * as React from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const CreateCrypto: React.FC = () => {
  const params = useParams<PortfolioPath>();
  const [addCrypto] = useAddCryptoMutation();
  const handleSubmit = async ({ confirmId, ...account }: CreateCryptoForm) => {
    try {
      await addCrypto({ ...(params as PortfolioPath), ...account }).unwrap();
    } catch (err) {
      toast('error in creating cryptos', { type: 'error' });
    }
  };
  return (
    <Stack gap={GAP}>
      <CryptoForm handleSubmit={handleSubmit} />
    </Stack>
  );
};

export default CreateCrypto;
