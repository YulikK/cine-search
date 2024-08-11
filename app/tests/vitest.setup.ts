import '@testing-library/jest-dom';
import { server } from './mocks/server';
import { afterAll, afterEach, beforeAll, vi } from 'vitest';

if (typeof window !== 'undefined') {
  window.scrollTo = (): void => {};
  global.URL.createObjectURL = vi.fn(() => 'http://localhost/fakeUrl');
}

beforeAll(() => {
  server.listen({
    onUnhandledRequest: 'warn',
  });
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
