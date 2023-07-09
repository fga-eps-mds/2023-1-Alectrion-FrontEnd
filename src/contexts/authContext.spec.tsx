// eslint-disable-next-line import/no-extraneous-dependencies
import { renderHook, act } from '@testing-library/react-hooks';
import { render, screen, fireEvent } from '@testing-library/react';
import { AuthProvider, useAuth } from './AuthContext';

function MockChildComponent() {
  const { signIn } = useAuth();

  return (
    <div>
      <button
        onClick={() =>
          signIn({ identifier: 'test@example.com', password: 'password' })
        }
      >
        Sign In
      </button>
    </div>
  );
}

describe('AuthProvider', () => {
  it('sets the user in local storage and updates the context after successful sign in', async () => {
    const mockApiResponse = {
      data: {
        email: 'test@example.com',
        expireIn: '3600',
        job: 'developer',
        name: 'John Doe',
        role: 'admin',
        token: 'abc123',
        cpf: '123456789',
        id: '123',
        temporaryPassword: false,
      },
    };
    const mockPost = jest.fn().mockResolvedValue(mockApiResponse);
    const mockNavigate = jest.fn();
    const mockUseNavigate = jest.fn(() => mockNavigate);
    const mockLocation = {
      state: { from: { pathname: '/dashboard' } },
    };
    const mockUseLocation = jest.fn(() => mockLocation);

    global.localStorage = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      length: 0,
      key: jest.fn(),
      clear: jest.fn(),
    } as Storage;

    jest.mock('@/config/lib/axios', () => ({
      api: { post: mockPost, defaults: { headers: { common: {} } } },
    }));
    jest.mock('react-router-dom', () => ({
      useNavigate: mockUseNavigate,
      useLocation: mockUseLocation,
    }));
    jest.mock('@/utils/toast', () => ({ toast: { error: jest.fn() } }));

    render(
      <AuthProvider>
        <MockChildComponent />
      </AuthProvider>
    );

    const signIn = screen.getByLabelText('Sign In');

    fireEvent.click(signIn);

    await act(() => Promise.resolve()); // Wait for the promise to resolve

    expect(mockPost).toHaveBeenCalledWith('/user/login', {
      identifier: 'test@example.com',
      password: 'password',
    });

    expect(global.localStorage.setItem).toHaveBeenCalledWith(
      '@alectrion:token',
      'abc123'
    );
    expect(global.localStorage.setItem).toHaveBeenCalledWith(
      '@alectrion:user',
      JSON.stringify({
        email: 'test@example.com',
        expireIn: '3600',
        token: 'abc123',
        job: 'developer',
        name: 'John Doe',
        role: 'admin',
        cpf: '123456789',
        id: '123',
        temporaryPassword: false,
      })
    );

    expect(mockUseNavigate).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard', { replace: true });

    // Verify that the user context is updated
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    expect(result.current.user).toEqual({
      email: 'test@example.com',
      expireIn: '3600',
      token: 'abc123',
      job: 'developer',
      name: 'John Doe',
      role: 'admin',
      cpf: '123456789',
      id: '123',
    });
  });
});
