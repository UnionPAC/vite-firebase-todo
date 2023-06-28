import { useState } from "react";
import TodoCard from "../components/TodoCard";
import { toast } from "react-toastify";
import { deleteField, doc, setDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import useFetchTodos from "../hooks/fetchTodos";
import Spinner from "../components/Spinner";

const Home = () => {
  const [todo, setTodo] = useState("");
  const [edit, setEdit] = useState<number | null>(null);
  const [edittedValue, setEdittedValue] = useState("");

  const { currentUser } = useAuth();
  const { loading, todos, setTodos } = useFetchTodos();

  const handleChange = (event: any) => {
    setTodo(event.target.value);
  };

  const addTodo = async () => {
    if (todo === "") {
      toast.warning("Please enter a valid todo");
      return;
    }
    try {
      const id =
        Object.keys(todos).length === 0
          ? 1
          : Math.max(...Object.keys(todos).map(Number)) + 1;
      setTodos({ ...todos, [id]: todo });
      const userRef = doc(db, "users", currentUser.uid);
      await setDoc(
        userRef,
        {
          todos: {
            [id]: todo,
          },
        },
        { merge: true }
      );
    } catch (error) {
      console.log(error);
      toast.error("Error adding todo");
    }
    setTodo("");
  };

  const handleEditMode = (todoKey: any) => {
    return () => {
      setEdit(todoKey);
      // have the current value continue to populate the input while editting
      setEdittedValue(todos[todoKey]);
    };
  };

  const editTodo = async (): Promise<void> => {
    if (edittedValue === "") {
      toast.warning("todo cannot be blank");
    }

    const id: any = edit;
    // set local todos
    setTodos({ ...todos, [id]: edittedValue });

    // set new todo value in firestore db
    const userRef = doc(db, "users", currentUser.uid);
    await setDoc(
      userRef,
      {
        todos: {
          [id]: edittedValue,
        },
      },
      { merge: true }
    );
    setEdit(null);
    setEdittedValue("");
  };

  const deleteTodo = (todoKey: string | number) => {
    return async () => {
      const tempObj = { ...todos };
      delete tempObj[todoKey];

      setTodos(tempObj);
      const userRef = doc(db, "users", currentUser.uid);
      await setDoc(
        userRef,
        {
          todos: {
            [todoKey]: deleteField(),
          },
        },
        { merge: true }
      );
    };
  };

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
        <button
          onClick={addTodo}
          className="bg-green-300 rounded px-4 py-2 m-2 font-semibold active:scale-95"
        >
          ADD
        </button>
      </div>
      {loading && <Spinner />}
      {!loading && todos && (
        <div>
          {Object.keys(todos).map((todo, index) => {
            return (
              <TodoCard
                key={index}
                handleEditMode={handleEditMode}
                editTodo={editTodo}
                edit={edit}
                todoKey={todo}
                edittedValue={edittedValue}
                setEdittedValue={setEdittedValue}
                deleteTodo={deleteTodo}
              >
                {todos[todo]}
              </TodoCard>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Home;
