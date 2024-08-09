import React, { PropsWithChildren, ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { AppStore, makeStore, PreloadStore } from '../store/store';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadStore;
  store?: AppStore;
}
export function customRender(
  ui: ReactElement,
  {
    preloadedState = {},
    store = makeStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
): ExtendedRenderOptions {
  function Wrapper({ children }: PropsWithChildren): React.ReactElement {
    return <Provider store={store}>{children}</Provider>;
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
