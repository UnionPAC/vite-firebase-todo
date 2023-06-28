import { useState } from "react";

const Home = () => {
  const [todo, setTodo] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(event.target.value);
  };

  const getTodos = async () => {};

  return (
    <div>
      <div className="text-center">
        <input
          type="text"
          placeholder="enter todo"
          value={todo}
          onChange={handleChange}
          className="m-2 border-2 p-2 w-[350px]"
        />
        <button className="bg-green-300 rounded px-4 py-2 m-2 font-semibold active:scale-95">ADD</button>
      </div>
    </div>
  );
};

export default Home;
