import { server } from './mocks/server.ts';
import '@testing-library/jest-dom';

if (typeof window !== 'undefined') {
  window.scrollTo = (): void => {};
  global.URL.createObjectURL = vi.fn(() => 'http://localhost/fakeUrl');
}

export const testGetParams = vi.fn();
export const testRouterPush = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: (): { push: () => void } => ({ push: testRouterPush }),
  usePathname: (): string => '/',
  useSearchParams: (): object => ({
    get: testGetParams,
  }),
}));

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
