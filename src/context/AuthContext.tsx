import { onAuthStateChanged, User, Unsubscribe } from "firebase/auth";
import { auth } from "../firebase";
import { useContext, createContext, useState, useEffect } from "react";

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext(null);

export const useAuth = (): any => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe: Unsubscribe = onAuthStateChanged(
      auth,
      async (user: User | null) => {
        if (user) {
          setCurrentUser(user);
        } else {
          setCurrentUser(null);
        }
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const value: any = { currentUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
