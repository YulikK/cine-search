import { configureStore } from '@reduxjs/toolkit';
import { countriesReducer } from './reducers/countries-slice';
import { historyReducer } from './reducers/history-slice';

const store = configureStore({
  reducer: {
    countries: countriesReducer,
    history: historyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
