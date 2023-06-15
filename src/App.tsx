import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Signup from "./pages/Signup";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Signup />
    </>
  );
};

export default App;
