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
    <div className="mt-12 flex flex-col items-start w-[75%] max-w-[400px] mx-auto">
      <h2 className="text-3xl font-semibold mb-8 uppercase">Signup</h2>
      <label htmlFor="email" className="mb-2">
        Email
      </label>
      <input
        type="email"
        id="email"
        name="email"
        value={userInfo.email}
        placeholder="johndoe@gmail.com"
        onChange={handleChange}
        className="mb-4 p-2 w-full"
      />
      <label htmlFor="password" className="mb-2">
        Password
      </label>
      <input
        type="password"
        id="password"
        name="password"
        value={userInfo.password}
        placeholder="Enter password"
        onChange={handleChange}
        className="mb-4 p-2 w-full"
      />
      <label htmlFor="confirmPassword" className="mb-2">
        Confirm Password
      </label>
      <input
        type="password"
        id="confirmPassword"
        name="confirmPassword"
        value={userInfo.confirmPassword}
        placeholder="Confirm password"
        onChange={handleChange}
        className="mb-4 p-2 w-full"
      />
      <button
        onClick={handleSignup}
        name="signup"
        className="text-white bg-stone-800 mt-4 mb-2 px-6 py-3 rounded tracking-wider w-full"
      >
        Signup
      </button>
      <button
        onClick={handleSignup}
        name="continueWithGoogle"
        className="text-white bg-primary-btn mt-4 mb-2 px-6 py-3 rounded tracking-wider w-full"
      >
        Continue with Google
      </button>
      <p className="text-sm mt-4 italic">
        Already have an account?{" "}
        <span
          className="text-primary-btn ml-1 cursor-pointer"
          onClick={() => navigate("/login")}
        >
          Login
        </span>
      </p>
    </div>
  );
};

export default Signup;
