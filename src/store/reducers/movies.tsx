import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { MoviesDetails, MoviesItem } from '../../types/api.tsx';

export interface MoviesState {
  list: MoviesItem[];
  total: number;
  details: MoviesDetails | null;
}

const initialState: MoviesState = {
  list: [],
  total: 0,
  details: null,
};

interface HydrateActionPayload {
  movies: MoviesState;
}

interface HydrateAction {
  type: typeof HYDRATE;
  payload: HydrateActionPayload;
}

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setMoviesList(state, action: PayloadAction<MoviesItem[]>) {
      state.list = action.payload;
    },
    setTotal(state, action: PayloadAction<number>) {
      state.total = action.payload;
    },
    setMovieDetails(state, action: PayloadAction<MoviesDetails | null>) {
      state.details = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action: HydrateAction) => ({
      ...state,
      ...action.payload.movies,
    }));
  },
});

export const { setMoviesList, setMovieDetails, setTotal } = moviesSlice.actions;
export const { reducer } = moviesSlice;
