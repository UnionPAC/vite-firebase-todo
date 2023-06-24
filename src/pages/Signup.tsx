import { useState, useEffect } from "react";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleAuthProvider } from "../firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Signup = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const { currentUser } = useAuth();

  console.log(currentUser);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const signupWithEmailAndPassword = async () => {
    const { email, password, confirmPassword } = userInfo;

    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
    } else {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        toast.success("User created successfully", { autoClose: 3000 });
        navigate("/");
      } catch (err: any) {
        console.error(err);
        toast.error(err?.message);
      }
    }
  };

  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleAuthProvider);
      navigate("/");
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message);
    }
  };

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser]);

  return (
    <>
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        name="email"
        value={userInfo.email}
        placeholder="johndoe@gmail.com"
        onChange={handleChange}
        className="border-2 block mb-2"
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        name="password"
        value={userInfo.password}
        placeholder="Enter password"
        onChange={handleChange}
        className="border-2 block mb-2"
      />
      <label htmlFor="confirmPassword">Confirm Password</label>
      <input
        type="password"
        id="confirmPassword"
        name="confirmPassword"
        value={userInfo.confirmPassword}
        placeholder="Confirm password"
        onChange={handleChange}
        className="border-2 block mb-2"
      />
      <button
        onClick={signupWithEmailAndPassword}
        className="bg-blue-600 text-white py-2 px-6 rounded border-none my-4 block"
      >
        Signup
      </button>
      <button
        onClick={loginWithGoogle}
        className="bg-pink-600 text-white py-2 px-6 rounded border-none my-4 block"
      >
        Continue with Google
      </button>
      <p>
        Already have an account?{" "}
        <span
          className="text-blue-500 cursor-pointer"
          onClick={() => navigate("/login")}
        >
          Login
        </span>
      </p>
    </>
  );
};

export default Signup;
