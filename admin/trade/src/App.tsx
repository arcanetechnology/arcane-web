/** @format */

import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import Auth from './pages/Auth';
import Home from './pages/Home';
import Users, { User, Transactions, Transaction, Group } from './pages/users';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
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

      <Route path="/auth" element={<Auth />} />
    </Routes>
  );
}
