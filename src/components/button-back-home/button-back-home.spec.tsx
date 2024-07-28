import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { ButtonBackHome } from './button-back-home.tsx';

describe('ButtonBackHome', () => {
  test('renders correctly', () => {
    render(
      <MemoryRouter>
        <ButtonBackHome />
      </MemoryRouter>
    );
    expect(
      screen.getByRole('link', { name: /back to homepage/i })
    ).toBeInTheDocument();
  });

  test('navigates to the homepage on click', async () => {
    render(
      <MemoryRouter initialEntries={['/initial']}>
        <Routes>
          <Route path="/initial" element={<ButtonBackHome />} />
          <Route path="/" element={<h1>Homepage</h1>} />
        </Routes>
      </MemoryRouter>
    );

    await userEvent.click(
      screen.getByRole('link', { name: /back to homepage/i })
    );

    expect(window.location.pathname).toBe('/');
  });
});
