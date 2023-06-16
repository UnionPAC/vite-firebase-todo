import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";

interface Todo {
  id: string;
  name: string;
  completed: boolean;
  createdAt: Date;
  dueDate: Date;
}

const Home = () => {
  const [todos, setTodos] = useState<Todo[] | null>(null);

  const todosRef = collection(db, "todos");

  const getAllTodos = async () => {
    try {
      const data = await getDocs(todosRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as Todo[]; // // Asserting the type of filteredData to Todo[]
      // console.log(filteredData);
      setTodos(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getAllTodos();
  }, []);

  return (
    <div>
      {todos &&
        todos.map((todo) => (
          <div key={todo.id}>
            <h3>{todo.name}</h3>
          </div>
        ))}
    </div>
  );
};

export default Home;
