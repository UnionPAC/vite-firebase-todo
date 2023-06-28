import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const Signup = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { currentUser, signup, loginWithGoogle } = useAuth();
  // console.log(currentUser);

  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSignup = (event: any) => {
    const { name } = event.target;
    const { email, password, confirmPassword } = userInfo;
    try {
      if (name === "signup") {
        signup(email, password, confirmPassword);
      } else if (name === "continueWithGoogle") {
        loginWithGoogle();
      } else {
        throw new Error("Signup Error");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error);
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
        onClick={handleSignup}
        name="signup"
        className="bg-blue-600 text-white py-2 px-6 rounded border-none my-4 block"
      >
        Signup
      </button>
      <button
        onClick={handleSignup}
        name="continueWithGoogle"
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
