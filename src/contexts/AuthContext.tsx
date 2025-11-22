import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { User, AuthContextType } from '../types';
import { supabase, isSupabaseConfigured } from '../utils/supabaseClient';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Default admin credentials (in production, use Supabase auth)
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin123';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check Supabase session first
    if (isSupabaseConfigured()) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          const adminUser: User = {
            id: session.user.id,
            username: session.user.email?.split('@')[0] || 'admin',
            email: session.user.email || '',
            role: 'admin',
          };
          setUser(adminUser);
        }
      });

      // Listen for auth changes
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          const adminUser: User = {
            id: session.user.id,
            username: session.user.email?.split('@')[0] || 'admin',
            email: session.user.email || '',
            role: 'admin',
          };
          setUser(adminUser);
        } else {
          setUser(null);
        }
      });

      return () => subscription.unsubscribe();
    } else {
      // Fallback to localStorage
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    // Try Supabase auth first
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: username.includes('@') ? username : `${username}@admin.local`,
          password: password,
        });

        if (error) throw error;
        if (data.user) {
          const adminUser: User = {
            id: data.user.id,
            username: data.user.email?.split('@')[0] || 'admin',
            email: data.user.email || '',
            role: 'admin',
          };
          setUser(adminUser);
          return true;
        }
      } catch (error) {
        console.error('Supabase auth error, falling back to local auth:', error);
      }
    }

    // Fallback to simple authentication
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      const adminUser: User = {
        id: '1',
        username: ADMIN_USERNAME,
        email: 'admin@blog.com',
        role: 'admin',
      };
      setUser(adminUser);
      localStorage.setItem('user', JSON.stringify(adminUser));
      return true;
    }
    return false;
  };

  const logout = async () => {
    if (isSupabaseConfigured()) {
      await supabase.auth.signOut();
    }
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
