import { createContext, useContext, useEffect, useState } from "react"
import { getMyDetails } from "../Services/auth"

const AuthContext = createContext<any>(null)

export const AuthProvider = ({ children }: { children: any }) => {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

   useEffect(() => {
    // 1. Load from localStorage first (instant UI)
    const saved = localStorage.getItem("user");
    if (saved) {
      setUser(JSON.parse(saved));
    }

    // 2. Verify token with backend
    const token = localStorage.getItem("accessToken");
    if (token) {
      getMyDetails()
        .then((res) => {
          const fixedData = {
            ...res.data,
            roles: res.data.role,   // backend → frontend format
          };

          setUser(fixedData);

          // sync with storage
          localStorage.setItem("user", JSON.stringify(fixedData));
        })
        .catch((err) => {
          console.error("Failed to fetch user details", err);
          setUser(null);
          localStorage.removeItem("user");
          localStorage.removeItem("accessToken");
        })
        .finally(() => setLoading(false));
    } else {
      setUser(null);
      setLoading(false);
    }
  }, []);
  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
        {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}