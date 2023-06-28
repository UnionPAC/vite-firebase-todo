import {
  User,
  signInWithRedirect,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth, googleAuthProvider } from "../firebase";
import { useContext, createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext(null);

export const useAuth: any = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // signup with email & password
  const signup = async (
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
    } else {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        toast.success("User created successfully", { autoClose: 3000 });
      } catch (err: any) {
        console.error(err);
        toast.error(err?.message);
      }
    }
  };

  // login with email & password
  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      console.log(err);
      toast.error(err?.message);
    }
  };

  // login with Google account
  const loginWithGoogle = async () => {
    try {
      await signInWithRedirect(auth, googleAuthProvider);
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message);
    }
  };

  // logout user
  const logout = async (auth: any) => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value: any = { currentUser, signup, login, loginWithGoogle, logout };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
