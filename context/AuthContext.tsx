"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import firebase_app from "@/firebase/config";

// Firebase auth instance
const auth = getAuth(firebase_app);

// Authentication context
export const AuthContext = createContext({});

// Hook to access the authentication context
export const useAuthContext = () => useContext(AuthContext);

interface AuthContextProviderProps {
  children: ReactNode;
}

export function AuthContextProvider({
  children,
}: AuthContextProviderProps): JSX.Element {
  // Authenticated user and loading status
  const [user, setUser] = useState<User | null>(null);
  const [uid, setUid] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Subscribe to the authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setUid(user.uid);
      } else {
        setUser(null);
        setUid(null);
      }
      setLoading(false);
    });

    // Unsubscribe from the authentication state changes on component unmount
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, uid }}>
      {loading ? (
        <>
          <header className="w-full p-4 bg-light">
            <div className="text-lg font-bold">InfoChronicle</div>
          </header>
          <div className="p-6">Authenticating...</div>
        </>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}
