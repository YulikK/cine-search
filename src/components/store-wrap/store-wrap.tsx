'use client';

import { Provider } from 'react-redux';
import { makeStore } from '../../store/store.tsx';

interface StoreWrapProps {
  children: React.ReactNode;
}

export const StoreWrap: React.FC<StoreWrapProps> = (props) => {
  const store = makeStore();
  return <Provider store={store}>{props.children}</Provider>;
};
