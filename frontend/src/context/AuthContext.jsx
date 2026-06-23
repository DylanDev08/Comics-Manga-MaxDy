import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

import { authService } from "../services/auth.service";

const AuthContext = createContext(null);

const createDemoUser = (payload = {}) => ({
  id: "demo-user",
  username: payload.username || payload.email?.split("@")[0] || "MaxDy Reader",
  email: payload.email || "demo@maxdy.local",
  role: payload.email?.includes("admin") ? "ADMIN" : "USER",
  status: "ACTIVE",
  isDemo: true,
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");

  const refreshUser = useCallback(async () => {
    try {
      setStatus("loading");
      const data = await authService.me();
      setUser(data);
      setStatus("authenticated");
    } catch {
      setUser(null);
      setStatus("anonymous");
    }
  }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const login = async (payload) => {
    setError("");
    setStatus("loading");
    try {
      const data = await authService.login(payload);
      setUser(data.user || data);
      setStatus("authenticated");
      return data;
    } catch (requestError) {
      if (requestError.message === "Failed to fetch") {
        const demoUser = createDemoUser(payload);
        setUser(demoUser);
        setStatus("authenticated");
        return { user: demoUser, demo: true };
      }

      setStatus("anonymous");
      setError(requestError.message);
      throw requestError;
    }
  };

  const register = async (payload) => {
    setError("");
    setStatus("loading");
    try {
      const data = await authService.register(payload);
      setUser(data.user || data);
      setStatus("authenticated");
      return data;
    } catch (requestError) {
      if (requestError.message === "Failed to fetch") {
        const demoUser = createDemoUser(payload);
        setUser(demoUser);
        setStatus("authenticated");
        return { user: demoUser, demo: true };
      }

      setStatus("anonymous");
      setError(requestError.message);
      throw requestError;
    }
  };

  const logout = async () => {
    await authService.logout().catch(() => null);
    setUser(null);
    setStatus("anonymous");
  };

  const value = useMemo(
    () => ({
      user,
      status,
      error,
      isAuthenticated: Boolean(user),
      isAdmin: user?.role === "ADMIN",
      login,
      logout,
      register,
      refreshUser,
    }),
    [user, status, error, refreshUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }

  return context;
}
