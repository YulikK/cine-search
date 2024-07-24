import { server } from './src/tests/mocks/server.ts';
import '@testing-library/jest-dom';

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
