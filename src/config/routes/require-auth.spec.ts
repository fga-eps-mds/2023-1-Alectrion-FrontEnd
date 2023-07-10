import React from 'react';
import { render } from '@testing-library/react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { RequireAuth } from './require-auth';
import {vi} from 'vitest'

vi.mock('@/contexts/AuthContext', () => ({
  useAuth: vi.fn(),
}));

vi.mock('react-router-dom', () => ({
  Navigate: vi.fn().mockReturnValue(null),
  useLocation: vi.fn().mockReturnValue({ pathname: '/test' }),
}));

describe('RequireAuth', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders children when isAuthenticated is true', () => {
    const mockUseAuth = useAuth as vi.MockedFunction<typeof useAuth>;
    mockUseAuth.mockReturnValue({ isAuthenticated: true });

    const { getByText } = render(
      <RequireAuth>
        <div>Children Component</div>
      </RequireAuth>
    );

    expect(getByText('Children Component')).toBeInTheDocument();
    expect(useAuth).toHaveBeenCalled();
    expect(useLocation).not.toHaveBeenCalled();
    expect(Navigate).not.toHaveBeenCalled();
  });

  test('renders Navigate component when isAuthenticated is false', () => {
    const mockUseAuth = useAuth as vi.MockedFunction<typeof useAuth>;
    mockUseAuth.mockReturnValue({ isAuthenticated: false });

    const { container } = render(
      <RequireAuth>
        <div>Children Component</div>
      </RequireAuth>
    );

    expect(container.firstChild).toBeNull();
    expect(useAuth).toHaveBeenCalled();
    expect(useLocation).toHaveBeenCalled();
    expect(Navigate).toHaveBeenCalledWith('/login', {
      state: { from: { pathname: '/test' } },
      replace: true,
    });
  });
});