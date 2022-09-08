/** @format */

import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';

export const profileAdapter = createEntityAdapter<>({
  selectId: (profile) => profile.id,
});
