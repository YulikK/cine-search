import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { COUNTRY_LIST } from '../../data/countries';

interface CountryState {
  countries: string[];
}

const initialState: CountryState = {
  countries: COUNTRY_LIST,
};

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    setCountries(state, action: PayloadAction<string[]>) {
      state.countries = action.payload;
    },
  },
});

export const { setCountries } = countriesSlice.actions;

export const countriesReducer = countriesSlice.reducer;
