/** @format */

import { createEntityAdapter, createSlice, nanoid } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { RootState } from './state';
import { Section } from '../types';

// can contain global data for all operations in it.
const sectionsAdapter = createEntityAdapter<Section>({
  selectId: (section) => section.id,
});

const sectionsSlice = createSlice({
  name: 'sections',
  initialState: sectionsAdapter.getInitialState(),
  reducers: {
    sectionAdded: sectionsAdapter.addOne,
    sectionOperationAdded: (
      state,
      action: PayloadAction<{ id: string; operation: string }>
    ) => {
      const operations = [
        ...(state.entities[action.payload.id]?.operations || []),
        action.payload.operation,
      ];
      return sectionsAdapter.updateOne(state, {
        id: action.payload.id,
        changes: { operations },
      });
    },

    sectionOperationDeleted: (
      state,
      action: PayloadAction<{ id: string; operation: string }>
    ) => {
      const operations: string[] =
        state.entities[action.payload.id]?.operations.filter(
          (o) => o !== action.payload.operation
        ) || [];
      return sectionsAdapter.updateOne(state, {
        id: action.payload.id,
        changes: { operations },
      });
    },
    sectionDeleted: sectionsAdapter.removeOne,
  },
});

export default sectionsSlice.reducer;

export const {
  sectionAdded,
  sectionDeleted,
  sectionOperationAdded,
  sectionOperationDeleted,
} = sectionsSlice.actions;

export const sectionsSelector = sectionsAdapter.getSelectors(
  (s: RootState) => s.sections
);
