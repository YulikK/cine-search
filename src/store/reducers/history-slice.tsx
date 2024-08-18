import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormFields } from '../../types';

interface FormState {
  submissions: FormFields[];
}

const initialState: FormState = {
  submissions: [],
};

const formSlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    addSubmission: (state, action: PayloadAction<FormFields>) => {
      state.submissions.push(action.payload);
    },
  },
});

export const { addSubmission } = formSlice.actions;
export const historyReducer = formSlice.reducer;
