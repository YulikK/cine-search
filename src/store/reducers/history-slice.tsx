import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types';

interface FormState {
  submissions: User[];
}

const initialState: FormState = {
  submissions: [],
};

const formSlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    addSubmission: (state, action: PayloadAction<User>) => {
      state.submissions.push(action.payload);
    },
  },
});

export const { addSubmission } = formSlice.actions;
export const historyReducer = formSlice.reducer;
