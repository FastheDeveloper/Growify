import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { getValueFor } from '~/src/utils/secureStorage';
import { STORAGE_KEYS } from '../constants/asyncKeys';

interface AuthContextType {
  user: any | null;
  session: any | null;
  isReady: boolean;
  hasBeenUsed: boolean;
  setHasBeenUsed: (value: boolean) => void;
  checkBeenUsed: () => Promise<void>;
  login: (credentials: any) => Promise<void>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  isReady: false,
  hasBeenUsed: false,
  setHasBeenUsed: () => {},
  checkBeenUsed: async () => {},
  login: async () => {},
  logout: async () => {},
  refreshSession: async () => {},
});

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<any | null>(null);
  const [session, setSession] = useState<any | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [hasBeenUsed, setHasBeenUsed] = useState(false);

  const checkBeenUsed = useCallback(async () => {
    try {
      const usedApp = await getValueFor(STORAGE_KEYS.HAS_APP_BEEN_USED);
      setHasBeenUsed(!!usedApp);
      setIsReady(true);
    } catch (err) {
      console.error('Error checking app use status:', err);
    }
  }, []);

  const login = useCallback(async (credentials: any) => {
    // call your API here
    setUser({ id: '123', name: 'John Doe' });
    setSession({ token: 'abc' });
    setIsReady(true);
  }, []);

  const logout = useCallback(async () => {
    // call your API logout endpoint
    setUser(null);
    setSession(null);
  }, []);

  const refreshSession = useCallback(async () => {
    // call refresh endpoint
  }, []);

  useEffect(() => {
    checkBeenUsed();
  }, [checkBeenUsed]);

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isReady,
        hasBeenUsed,
        setHasBeenUsed,
        checkBeenUsed,
        login,
        logout,
        refreshSession,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
