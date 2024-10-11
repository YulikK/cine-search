import React from 'react';
import { fireEvent, screen } from '@testing-library/react';

import { DEFAULT_PAGE } from '../../common/constant.tsx';
import { customRender } from '../../tests/custom-render.tsx';
import { CloseButton } from './button-close.tsx';
import { testGetParams, testRouterPush } from '../../tests/vitest.setup.ts';

describe('ButtonClose', () => {
  test('renders correctly', () => {
    customRender(<CloseButton />);

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('close details on click', () => {
    customRender(<CloseButton />);

    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(testGetParams).toHaveBeenCalledWith('query');
    expect(testGetParams).toHaveBeenCalledWith('page');

    expect(testRouterPush).toHaveBeenCalledWith(`/?page=${DEFAULT_PAGE}`);
  });
});
