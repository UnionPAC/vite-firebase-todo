import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const { currentUser, login, loginWithGoogle } = useAuth();
  console.log(currentUser);

  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleLogin = (event: any) => {
    const { name } = event.target;
    const { email, password } = userInfo;
    try {
      if (name === "login") {
        console.log("normal login");
        login(email, password);
        navigate("/");
      } else if (name === "continueWithGoogle") {
        console.log("login with google");
        loginWithGoogle();
        navigate("/");
      } else {
        throw new Error("Login Error");
      }
    } catch (error) {
      console.log(error);
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
      <button
        onClick={handleLogin}
        name="login"
        className="bg-blue-600 text-white py-2 px-6 rounded border-none my-4"
      >
        Login
      </button>
      <button
        onClick={handleLogin}
        name="continueWithGoogle"
        className="bg-pink-600 text-white py-2 px-6 rounded border-none my-4 block"
      >
        Continue with Google
      </button>
      <p>
        Don't have an account?{" "}
        <span
          className="text-blue-500 cursor-pointer"
          onClick={() => navigate("/signup")}
        >
          Signup
        </span>
      </p>
    </>
  );
};

export default Login;
