import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from '@/utils/toast';
import { api } from '@/config/lib/axios';
import {
  GetUserInfoResponse,
  SignedUser,
  SignInCredentials,
  AuthResponse,
} from '@/types/auth';

interface AuthContextData {
  signOut(): void;
  signIn(credentials: SignInCredentials): Promise<void>;
  isAuthenticated: boolean;
  user: SignedUser | null;
}

const AuthContext = createContext({} as AuthContextData);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<SignedUser | null>(() => {
    const loadedUser = localStorage.getItem('@alectrion:user');

    if (!loadedUser) return {} as SignedUser;

    return JSON.parse(loadedUser);
  });
  const isAuthenticated = !!user?.token;

  const signIn = useCallback(
    async ({ username, password }: SignInCredentials) => {
      try {
        const response = await api.post<AuthResponse>(
          `${import.meta.env.VITE_PUBLIC_GESTOR_DE_USUARIOS_URL}/auth`,
          {
            username,
            password,
          }
        );

        const { token } = response.data;

        const res = await api.get<GetUserInfoResponse>(
          `${import.meta.env.VITE_PUBLIC_GESTOR_DE_USUARIOS_URL}/auth`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const { username: name, email, userId: id, profile } = res.data;

        localStorage.setItem('@alectrion:token', token);
        localStorage.setItem(
          '@alectrion:user',
          JSON.stringify({
            name,
            email,
            id,
            token,
            profile,
          })
        );

        setUser({ name, email, id, token, profile });

        api.defaults.headers.common.Authorization = `Bearer ${token}`;

        const from = location.state?.from?.pathname || '/';

        navigate(from, { replace: true });
      } catch (err) {
        toast.error(
          'Não foi possível realizar o login! Verifique o email e a senha e tente novamente.'
        );
      }
    },
    [navigate, location.state?.from?.pathname]
  );

  const signOut = useCallback(() => {
    localStorage.removeItem('@alectrion:token');
    localStorage.removeItem('@alectrion:user');

    setUser(null);

    navigate('/login');
  }, [navigate]);

  const value = useMemo(
    () => ({
      signIn,
      signOut,
      isAuthenticated,
      user,
    }),
    [signIn, signOut, isAuthenticated, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}
