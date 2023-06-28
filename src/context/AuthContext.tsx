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
import Spinner from "../components/Spinner";

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
    setLoading(true);
    if (!email || !password) {
      toast.error("Please enter an email and a password");
    } else if (password !== confirmPassword) {
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
    setLoading(false);
  };

  // login with email & password
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      console.log(err);
      toast.error("Incorrect email or password");
    }
    setLoading(false);
  };

  // login with Google account
  const loginWithGoogle = async () => {
    setLoading(true);
    try {
      await signInWithRedirect(auth, googleAuthProvider);
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message);
    }
    setLoading(false);
  };

  // logout user
  const logout = async (auth: any) => {
    setLoading(true);
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
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
      {loading && <Spinner />}
    </AuthContext.Provider>
  );
};
