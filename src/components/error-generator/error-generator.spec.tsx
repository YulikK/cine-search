import React from 'react';

import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ErrorGenerator } from './error-generator';

describe('ErrorGenerator Component', () => {
  it('renders without crashing', () => {
    render(<ErrorGenerator />);
    expect(
      screen.getByRole('button', { name: /generate error/i })
    ).toBeInTheDocument();
  });

  it('should throw an error when the button is clicked', () => {
    const consoleErrorMock = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    expect(() => render(<ErrorGenerator />)).not.toThrow();
    expect(() =>
      fireEvent.click(screen.getByRole('button', { name: /generate error/i }))
    ).toThrowError('This is a test error');

    consoleErrorMock.mockRestore();
  });
});
