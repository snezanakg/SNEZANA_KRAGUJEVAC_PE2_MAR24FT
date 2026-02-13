import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { API_BASE } from "../utils/api";

interface User {
  name: string;
  email: string;
  venueManager: boolean;
  accessToken: string;
}

interface AuthContextType {
  user: User | null;
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
    const stored = localStorage.getItem("holidaze_user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  async function login(email: string, password: string) {
    const res = await fetch(`${API_BASE}/auth/login?_holidaze=true`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.errors?.[0]?.message || "Login failed");
    }

    localStorage.setItem("holidaze_token", data.data.accessToken);
    localStorage.setItem("holidaze_user", JSON.stringify(data.data));
    setUser(data.data);
  }

  async function register(
    name: string,
    email: string,
    password: string,
    venueManager: boolean
  ) {
    const res = await fetch(`${API_BASE}/auth/register?_holidaze=true`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, venueManager }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.errors?.[0]?.message || "Register failed");
    }

    await login(email, password);
  }

  function logout() {
    localStorage.clear();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be inside AuthProvider");
  return context;
}
