import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { supabase } from '~/src/utils/supabase';
import {
  getValueFor,
  save,
  deleteKey,
  saveSession,
  getStoredSession,
  clearSession,
} from '~/src/utils/secureStorage';
import { STORAGE_KEYS } from '../constants/asyncKeys';

interface AuthContextType {
  user: any | null;
  session: any | null;
  isReady: boolean;
  hasBeenUsed: boolean;
  loading: boolean;
  setHasBeenUsed: (value: boolean) => void;
  checkBeenUsed: () => Promise<void>;
  login: (email: string, password: string) => Promise<{ error: any; data?: any }>;
  signup: (email: string, password: string, metadata?: any) => Promise<{ error: any; data?: any }>;
  signupWithOTP: (
    email: string,
    password: string,
    metadata?: any
  ) => Promise<{ error: any; data?: any }>;
  verifyOTP: (
    email: string,
    token: string,
    type: 'signup' | 'recovery'
  ) => Promise<{ error: any; data?: any }>;
  forgotPassword: (email: string) => Promise<{ error: any; data?: any }>;
  resetPassword: (password: string) => Promise<{ error: any; data?: any }>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  isReady: false,
  hasBeenUsed: false,
  loading: false,
  setHasBeenUsed: () => {},
  checkBeenUsed: async () => {},
  login: async () => ({ error: null }),
  signup: async () => ({ error: null }),
  signupWithOTP: async () => ({ error: null }),
  verifyOTP: async () => ({ error: null }),
  forgotPassword: async () => ({ error: null }),
  resetPassword: async () => ({ error: null }),
  logout: async () => {},
  refreshSession: async () => {},
});

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<any | null>(null);
  const [session, setSession] = useState<any | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [hasBeenUsed, setHasBeenUsed] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkBeenUsed = useCallback(async () => {
    try {
      const usedApp = await getValueFor(STORAGE_KEYS.HAS_APP_BEEN_USED);
      setHasBeenUsed(!!usedApp);
    } catch (err) {
      console.error('Error checking app use status:', err);
    }
  }, []);

  const saveTokensToStorage = useCallback(async (session: any) => {
    if (session) {
      try {
        // Save the entire session object
        await saveSession(session);

        // Also save individual tokens if needed for other parts of the app
        if (session.access_token) {
          await save(STORAGE_KEYS.AUTH_TOKEN, session.access_token);
        }
        if (session.refresh_token) {
          await save(STORAGE_KEYS.REFRESH_TOKEN, session.refresh_token);
        }
        if (session.user) {
          await save(STORAGE_KEYS.USER_DATA, JSON.stringify(session.user));
        }
      } catch (error) {
        console.error('Error saving tokens:', error);
      }
    }
  }, []);

  const clearTokensFromStorage = useCallback(async () => {
    try {
      await clearSession();
      await deleteKey(STORAGE_KEYS.AUTH_TOKEN);
      await deleteKey(STORAGE_KEYS.REFRESH_TOKEN);
      await deleteKey(STORAGE_KEYS.USER_DATA);
    } catch (error) {
      console.error('Error clearing tokens:', error);
    }
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      setLoading(true);
      try {
        const { error, data } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          return { error };
        }

        if (data.session) {
          setSession(data.session);
          setUser(data.user);
          await saveTokensToStorage(data.session);

          // Mark app as used when user successfully logs in
          await save(STORAGE_KEYS.HAS_APP_BEEN_USED, 'true');
          setHasBeenUsed(true);
        }

        return { error: null, data };
      } catch (err) {
        console.error('Login error:', err);
        return { error: err };
      } finally {
        setLoading(false);
      }
    },
    [saveTokensToStorage]
  );

  const signup = useCallback(
    async (email: string, password: string, metadata?: any) => {
      setLoading(true);
      try {
        const { error, data } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: metadata,
          },
        });

        if (error) {
          return { error };
        }

        // If email confirmation is disabled, handle session immediately
        if (data.session) {
          setSession(data.session);
          setUser(data.user);
          await saveTokensToStorage(data.session);

          await save(STORAGE_KEYS.HAS_APP_BEEN_USED, 'true');
          setHasBeenUsed(true);
        }

        return { error: null, data };
      } catch (err) {
        console.error('Signup error:', err);
        return { error: err };
      } finally {
        setLoading(false);
      }
    },
    [saveTokensToStorage]
  );

  const signupWithOTP = useCallback(async (email: string, password: string, metadata?: any) => {
    setLoading(true);
    try {
      const { error, data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata,
          emailRedirectTo: undefined, // This ensures OTP flow
        },
      });

      return { error, data };
    } catch (err) {
      console.error('Signup with OTP error:', err);
      return { error: err };
    } finally {
      setLoading(false);
    }
  }, []);

  const verifyOTP = useCallback(
    async (email: string, token: string, type: 'signup' | 'recovery' = 'signup') => {
      setLoading(true);
      try {
        const { error, data } = await supabase.auth.verifyOtp({
          email,
          token,
          type,
        });

        if (error) {
          return { error };
        }

        if (data.session) {
          setSession(data.session);
          setUser(data.user);
          await saveTokensToStorage(data.session);

          await save(STORAGE_KEYS.HAS_APP_BEEN_USED, 'true');
          setHasBeenUsed(true);
        }

        return { error: null, data };
      } catch (err) {
        console.error('OTP verification error:', err);
        return { error: err };
      } finally {
        setLoading(false);
      }
    },
    [saveTokensToStorage]
  );

  const forgotPassword = useCallback(async (email: string) => {
    setLoading(true);
    try {
      const { error, data } = await supabase.auth.resetPasswordForEmail(email);

      return { error, data };
    } catch (err) {
      console.error('Forgot password error:', err);
      return { error: err };
    } finally {
      setLoading(false);
    }
  }, []);

  const resetPassword = useCallback(async (password: string) => {
    setLoading(true);
    try {
      const { error, data } = await supabase.auth.updateUser({
        password,
      });

      if (error) {
        return { error };
      }

      return { error: null, data };
    } catch (err) {
      console.error('Reset password error:', err);
      return { error: err };
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error('Logout error:', error);
      }

      // Clear local state and storage regardless of API response
      setUser(null);
      setSession(null);
      await clearTokensFromStorage();
    } catch (err) {
      console.error('Logout error:', err);
      // Still clear local state on error
      setUser(null);
      setSession(null);
      await clearTokensFromStorage();
    } finally {
      setLoading(false);
    }
  }, [clearTokensFromStorage]);

  const refreshSession = useCallback(async () => {
    try {
      const { data, error } = await supabase.auth.refreshSession();

      if (error) {
        console.error('Refresh session error:', error);
        // If refresh fails, logout user
        await logout();
        return;
      }

      if (data.session) {
        setSession(data.session);
        setUser(data.user);
        await saveTokensToStorage(data.session);
      }
    } catch (err) {
      console.error('Refresh session error:', err);
      await logout();
    }
  }, [saveTokensToStorage, logout]);

  // Initialize auth state
  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        // First try to get session from Supabase
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          console.error('Get session error:', error);
        }

        // If no active session, try to restore from storage
        let activeSession = session;
        if (!session) {
          const storedSession = await getStoredSession();
          if (storedSession) {
            // Try to restore the session in Supabase
            const { data, error: restoreError } = await supabase.auth.setSession({
              access_token: storedSession.access_token,
              refresh_token: storedSession.refresh_token,
            });

            if (!restoreError && data.session) {
              activeSession = data.session;
            } else {
              // If restoration fails, clear the stored session
              await clearTokensFromStorage();
            }
          }
        }

        if (mounted) {
          if (activeSession) {
            setSession(activeSession);
            setUser(activeSession.user);
            await saveTokensToStorage(activeSession);
          }

          await checkBeenUsed();
          setIsReady(true);
          setLoading(false);
        }
      } catch (err) {
        console.error('Initialize auth error:', err);
        if (mounted) {
          setIsReady(true);
          setLoading(false);
        }
      }
    };

    initializeAuth();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return;

      console.log('Auth state change:', event, session);

      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        if (session) {
          setSession(session);
          setUser(session.user);
          await saveTokensToStorage(session);
        }
      } else if (event === 'SIGNED_OUT') {
        setSession(null);
        setUser(null);
        await clearTokensFromStorage();
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [checkBeenUsed, saveTokensToStorage, clearTokensFromStorage]);

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isReady,
        hasBeenUsed,
        loading,
        setHasBeenUsed,
        checkBeenUsed,
        login,
        signup,
        signupWithOTP,
        verifyOTP,
        forgotPassword,
        resetPassword,
        logout,
        refreshSession,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
