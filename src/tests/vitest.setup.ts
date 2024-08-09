import { server } from './mocks/server.ts';
import '@testing-library/jest-dom';

if (typeof window !== 'undefined') {
  window.scrollTo = (): void => {};
  global.URL.createObjectURL = vi.fn(() => 'http://localhost/fakeUrl');
}

const mockRouter = {
  events: {
    on: vi.fn(),
    off: vi.fn(),
    emit: vi.fn(),
  },
  query: {},
  push: vi.fn(),
  replace: vi.fn(),
  pathname: '',
  route: '',
  asPath: '',
  basePath: '',
  isLocaleDomain: false,
  isReady: true,
};

vi.mock('next/router', async (importOriginal): Promise<object> => {
  const actual: object = await importOriginal();
  return {
    ...actual,
    useRouter: () => mockRouter,
  };
});

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
