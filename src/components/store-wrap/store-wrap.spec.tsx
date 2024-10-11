import { render } from '@testing-library/react';
import { StoreWrap } from './store-wrap.tsx';
import { makeStore } from '../../store/store.tsx';

vi.mock('../../store/store.tsx', () => ({
  makeStore: vi.fn(() => ({
    getState: vi.fn(),
    subscribe: vi.fn(),
    dispatch: vi.fn(),
  })),
}));

describe('StoreWrap', () => {
  it('renders children correctly', () => {
    const { getByText } = render(
      <StoreWrap>
        <div>Test Child</div>
      </StoreWrap>
    );

    expect(getByText('Test Child')).toBeInTheDocument();
  });

  it('calls makeStore only once', () => {
    render(
      <StoreWrap>
        <div>Test Child</div>
      </StoreWrap>
    );

    expect(makeStore).toHaveBeenCalled();
  });
});
