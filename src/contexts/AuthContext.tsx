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
import { SignedUser, SignInCredentials, AuthResponse } from '@/types/auth';

interface AuthContextData {
  signOut(): void;
  signIn(credentials: SignInCredentials): Promise<void>;
  isAuthenticated: boolean;
  user: SignedUser | null;
  verifyExpiredToken(): void;
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
    async ({ identifier, password }: SignInCredentials) => {
      try {
        const response = await api.post<AuthResponse>(`/user/login`, {
          identifier,
          password,
        });

        const {
          email,
          expireIn,
          job,
          name,
          role,
          token,
          cpf,
          id,
          temporaryPassword,
        } = response.data;

        localStorage.setItem('@alectrion:token', token);
        localStorage.setItem(
          '@alectrion:user',
          JSON.stringify({
            name,
            email,
            expireIn,
            token,
            job,
            role,
            cpf,
            id,
            temporaryPassword,
          })
        );

        setUser({ email, expireIn, job, name, role, token, cpf, id });

        api.defaults.headers.common.Authorization = `Bearer ${token}`;

        const from = location.state?.from?.pathname || '/';

        if (temporaryPassword) {
          navigate('/change-password');
        } else {
          navigate(from, { replace: true });
        }
      } catch (err: any) {
        toast.error(err.response.data.error);
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

  const decodeToken = (token: string): any => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const decodedToken = JSON.parse(window.atob(base64));
      return decodedToken;
    } catch (error) {
      return null; // Token inválido ou erro ao decodificar
    }
  };

  const isTokenExpired = useCallback((token: string): boolean => {
    const decodedToken = decodeToken(token);

    if (!decodedToken || !decodedToken.exp) {
      return true; // Token inválido ou sem data de expiração
    }

    const expirationTime = decodedToken.exp * 1000; // Converter para milissegundos
    const currentTime = Date.now();

    return currentTime >= expirationTime;
  }, []);

  const verifyExpiredToken = useCallback(() => {
    const token = String(localStorage.getItem('@alectrion:token'));
    const expired = isTokenExpired(token);
    if (expired) {
      toast.error('Token expirado, faça o login novamente', 'Erro');
      signOut();
    }
  }, [isTokenExpired, signOut]);

  const value = useMemo(
    () => ({
      signIn,
      signOut,
      isAuthenticated,
      user,
      verifyExpiredToken,
    }),
    [signIn, signOut, isAuthenticated, user, verifyExpiredToken]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}
