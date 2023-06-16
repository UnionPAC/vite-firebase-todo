import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleAuthProvider } from "../firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const loginWithEmailAndPassword = async () => {
    console.log("logging in ...");

    const { email, password } = userInfo;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
      console.log("login success");
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
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
      <button
        onClick={loginWithEmailAndPassword}
        className="bg-blue-600 text-white py-2 px-6 rounded border-none my-4"
      >
        Login
      </button>
      <button
        onClick={loginWithGoogle}
        className="bg-pink-600 text-white py-2 px-6 rounded border-none my-4 block"
      >
        Continue with Google
      </button>
    </>
  );
};

export default Login;
