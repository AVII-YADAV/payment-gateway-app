import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import toast from 'react-hot-toast';

import { authAPI } from '@/services/api';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'USER' | 'MERCHANT' | 'ADMIN' | 'SUPER_ADMIN';
  isVerified: boolean;
  merchant?: {
    id: string;
    businessName: string;
    kycStatus: string;
    isActive: boolean;
  };
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
}

type AuthAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_USER'; payload: User }
  | { type: 'SET_TOKEN'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_USER'; payload: Partial<User> };

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  token: localStorage.getItem('token'),
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_USER':
      return { ...state, user: action.payload, isAuthenticated: true, isLoading: false };
    case 'SET_TOKEN':
      localStorage.setItem('token', action.payload);
      return { ...state, token: action.payload };
    case 'LOGOUT':
      localStorage.removeItem('token');
      return { ...initialState, isLoading: false };
    case 'UPDATE_USER':
      return { ...state, user: state.user ? { ...state.user, ...action.payload } : null };
    default:
      return state;
  }
};

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
  refreshToken: () => Promise<void>;
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role?: 'USER' | 'MERCHANT';
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const queryClient = useQueryClient();

  // Fetch user profile on mount if token exists
  const { data: userData, isLoading: isUserLoading } = useQuery(
    ['user', 'profile'],
    () => authAPI.getProfile(),
    {
      enabled: !!state.token,
      retry: false,
      onSuccess: (data) => {
        dispatch({ type: 'SET_USER', payload: data.user });
      },
      onError: () => {
        dispatch({ type: 'LOGOUT' });
      },
    }
  );

  useEffect(() => {
    if (!state.token) {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [state.token]);

  const loginMutation = useMutation(
    (credentials: { email: string; password: string }) => authAPI.login(credentials),
    {
      onSuccess: (data) => {
        dispatch({ type: 'SET_TOKEN', payload: data.data.accessToken });
        dispatch({ type: 'SET_USER', payload: data.data.user });
        toast.success('Login successful!');
      },
      onError: (error: any) => {
        toast.error(error.response?.data?.error?.message || 'Login failed');
      },
    }
  );

  const registerMutation = useMutation(
    (userData: RegisterData) => authAPI.register(userData),
    {
      onSuccess: (data) => {
        dispatch({ type: 'SET_TOKEN', payload: data.data.accessToken });
        dispatch({ type: 'SET_USER', payload: data.data.user });
        toast.success('Registration successful! Please check your email to verify your account.');
      },
      onError: (error: any) => {
        toast.error(error.response?.data?.error?.message || 'Registration failed');
      },
    }
  );

  const updateProfileMutation = useMutation(
    (data: Partial<User>) => authAPI.updateProfile(data),
    {
      onSuccess: (data) => {
        dispatch({ type: 'UPDATE_USER', payload: data.data.user });
        toast.success('Profile updated successfully!');
      },
      onError: (error: any) => {
        toast.error(error.response?.data?.error?.message || 'Profile update failed');
      },
    }
  );

  const refreshTokenMutation = useMutation(
    () => authAPI.refreshToken(),
    {
      onSuccess: (data) => {
        dispatch({ type: 'SET_TOKEN', payload: data.data.accessToken });
      },
      onError: () => {
        dispatch({ type: 'LOGOUT' });
      },
    }
  );

  const login = async (email: string, password: string) => {
    await loginMutation.mutateAsync({ email, password });
  };

  const register = async (userData: RegisterData) => {
    await registerMutation.mutateAsync(userData);
  };

  const logout = () => {
    authAPI.logout().catch(console.error);
    dispatch({ type: 'LOGOUT' });
    queryClient.clear();
    toast.success('Logged out successfully');
  };

  const updateProfile = async (data: Partial<User>) => {
    await updateProfileMutation.mutateAsync(data);
  };

  const refreshToken = async () => {
    await refreshTokenMutation.mutateAsync();
  };

  const value: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    updateProfile,
    refreshToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 