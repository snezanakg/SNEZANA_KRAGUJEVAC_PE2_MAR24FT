import { createContext, useContext, useState, useEffect, ReactNode } from "react";

const API_BASE = "https://v2.api.noroff.dev";

interface User {
  name: string;
  email: string;
  venueManager: boolean;
  accessToken: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string,
    venueManager: boolean
  ) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("holidaze_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const isAuthenticated = !!user;

  async function login(email: string, password: string) {
    const response = await fetch(`${API_BASE}/auth/login?_holidaze=true`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.errors?.[0]?.message || "Login failed");
    }

    const userData: User = {
      name: data.data.name,
      email: data.data.email,
      venueManager: data.data.venueManager,
      accessToken: data.data.accessToken,
    };

    localStorage.setItem("holidaze_user", JSON.stringify(userData));
    localStorage.setItem("holidaze_token", userData.accessToken);

    setUser(userData);
  }

  async function register(
    name: string,
    email: string,
    password: string,
    venueManager: boolean
  ) {
    const response = await fetch(`${API_BASE}/auth/register?_holidaze=true`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, venueManager }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.errors?.[0]?.message || "Registration failed");
    }

    await login(email, password);
  }

  function logout() {
    localStorage.removeItem("holidaze_user");
    localStorage.removeItem("holidaze_token");
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}