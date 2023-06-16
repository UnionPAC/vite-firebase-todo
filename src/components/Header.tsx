import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const user = auth.currentUser;

  const navigate = useNavigate();

  const handleLogout = async () => {
    console.log("logging out ...");
    try {
      await signOut(auth);
      navigate("/login");
      console.log("logout success");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header>
      <nav className="flex w-[80%] mx-auto justify-between py-4">
        <h1>Todo Ninja 🥷</h1>
        {user ? (
          <div className="space-x-10">
            <Link to="/">Home</Link>
            <Link to="/profile">Profile</Link>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <>
            <ul className="space-x-10">
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </ul>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
