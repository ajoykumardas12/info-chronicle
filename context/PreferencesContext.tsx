"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useAuthContext } from "@/context/AuthContext";
import getDocument from "@/firebase/getData";
import { getAuth } from "firebase/auth";
import firebase_app from "@/firebase/config";

// Firebase auth instance
const auth = getAuth(firebase_app);

// Authentication context
export const PreferencesContext = createContext({});

// Hook to access the authentication context
export const usePreferencesContext = () => useContext(PreferencesContext);

interface PreferencesContextProviderProps {
  children: ReactNode;
}

export interface Preferences {
  category: string;
}

export function PreferencesContextProvider({
  children,
}: PreferencesContextProviderProps): JSX.Element {
  // Loading status
  const [loading, setLoading] = useState(true);

  // Get user preference from firestore
  const { uid } = useAuthContext() as { uid: string };
  const [preferences, setPreferences] = useState<null | Preferences>(null);
  const getPreferences = async () => {
    const { result, error } = await getDocument("preferences", uid);
    const data = result?.data();

    if (data) {
      setPreferences(data as Preferences);
      setLoading(false);
    }
  };

  useEffect(() => {
    getPreferences();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PreferencesContext.Provider value={{ preferences, setPreferences }}>
      {loading ? (
        <>
          <header className="w-full p-4 bg-light">
            <div className="text-lg font-bold">InfoChronicle</div>
          </header>
          <div className="p-6">loading Preferences...</div>
        </>
      ) : (
        children
      )}
    </PreferencesContext.Provider>
  );
}
