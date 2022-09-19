/** @format */

import { useGetUserQuery } from '@/services';
import * as React from 'react';
import { useParams } from 'react-router-dom';

const ViewUser: React.FC = () => {
  const { userId } = useParams();
  const { data } = useGetUserQuery(userId!);
  return <h1>{data?.email}</h1>;
};

export default ViewUser;
