import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "react-toastify";

const Signup = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { email, password, confirmPassword } = userInfo;

    if (password !== confirmPassword) {
      alert("Passwords don't match");
    } else {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        toast.success("User created successfully");
      } catch (error: any) {
        toast.error(error?.message);
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
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
          type="submit"
          className="bg-blue-600 text-white py-2 px-6 rounded border-none my-4"
        >
          Signup
        </button>
      </form>
    </>
  );
};

export default Signup;
