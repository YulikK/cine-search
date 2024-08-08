'use client';

import { Provider } from 'react-redux';
import { useRef } from 'react';
import { AppStore, makeStore } from '../../store/store.tsx';

interface StoreWrapProps {
  children: React.ReactNode;
}

export const StoreWrap: React.FC<StoreWrapProps> = (props) => {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }
  return <Provider store={storeRef.current}>{props.children}</Provider>;
};
