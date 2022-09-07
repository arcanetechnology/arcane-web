/** @format */

import accounts from './accounts';

export const { accountAdded, accountDeleted } = accounts.actions;
export default accounts.reducer;
export * from './accountsSelectors';
export * from './accounts';
