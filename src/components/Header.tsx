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
    <header className="mb-6">
      <nav className="flex flex-col items-center  w-[90%] mx-auto mt-8 sm:flex-row sm:justify-between sm:mt-4">
        <h1 className="text-4xl font-bold m-4">🥷 Todo Ninja </h1>
        {user && (
          <button
            className="font-medium text-white bg-stone-800 mt-4 mb-6 sm:max-w-[150px] px-6 py-3 rounded tracking-wider w-[70%] max-w-[250px] uppercase hover:scale-105"
            onClick={handleLogout}
          >
            Logout
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;
