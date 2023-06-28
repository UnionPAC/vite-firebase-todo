import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center mt-20">
      <h1>404 - Page Not Found</h1>
      <p>Oops! The page you're looking for does not exist.</p>
      <button className="mt-6 px-4 py-2 bg-slate-700 text-white border-none rounded" onClick={() => navigate("/")}>Back to Home</button>
    </div>
  );
};

export default NotFound;
