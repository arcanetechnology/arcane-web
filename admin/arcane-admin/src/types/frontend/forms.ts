/** @format */
import { User } from '..';

export type SearchUserForm = Omit<User, 'userId' | 'analyticsId'>;
