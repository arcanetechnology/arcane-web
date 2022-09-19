/** @format */

import * as React from 'react';
import Users, { User, Transactions, Transaction, Group } from './users';
import { Routes, Route } from 'react-router-dom';
import { NavigationBar, TradeBreadCrumbs } from '@/components';
import { Container } from '@mui/system';

const Home: React.FC = () => {
  return (
    <React.Fragment>
      <NavigationBar />
      <Container component="main" sx={{ mt: 2 }}>
        <TradeBreadCrumbs />
        <Routes>
          <Route path="/">
            <Route index element={<Users />} />
            <Route path=":userId">
              <Route index element={<User />} />
              <Route path="transactions">
                <Route index element={<Transactions />} />
                <Route path=":transactionId">
                  <Route index element={<Transaction />} />
                  <Route path=":id" element={<Group />} />
                </Route>
              </Route>
            </Route>
          </Route>
        </Routes>
      </Container>
    </React.Fragment>
  );
};

export default Home;
