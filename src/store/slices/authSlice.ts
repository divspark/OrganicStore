import { StateCreator } from 'zustand';
import { api } from '../../services/api';
import { AuthSlice, GrowStoreState } from '../types';

export const createAuthSlice: StateCreator<
  GrowStoreState,
  [],
  [],
  AuthSlice
> = (set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  login: async (credentials) => {
    const res = await api.auth.login(credentials);
    if (res.user) {
      set({
        user: res.user,
        token: res.token || null,
        isAuthenticated: true,
      });
    }
    return res;
  },

  signup: async (userData) => {
    const res = await api.auth.signup(userData);
    if (res.user) {
      set({
        user: res.user,
        token: res.token || null,
        isAuthenticated: true,
      });
    }
    return res;
  },

  logout: () => {
    api.auth.logout();
    set({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  },

  setUser: (user) => {
    set({
      user,
      isAuthenticated: !!user,
    });
  },
});
