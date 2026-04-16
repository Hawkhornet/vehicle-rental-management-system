import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("vrms_user");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("vrms_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("vrms_user");
    }
  }, [user]);

  const value = useMemo(
    () => ({
      user,
      login: (email, password) => {
        if (!email.trim() || !password.trim()) {
          return { success: false, message: "Enter both email and password." };
        }

        const nextUser = {
          name: email.split("@")[0].replace(/[^a-zA-Z0-9]/g, " ").trim() || "User",
          email,
        };
        setUser(nextUser);
        return { success: true, message: "Login successful." };
      },
      logout: () => setUser(null),
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}
