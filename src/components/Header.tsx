import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const user = auth.currentUser;

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout(auth);
      navigate("/login");
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
