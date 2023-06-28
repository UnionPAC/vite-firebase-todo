import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";

interface Todo {
  [key: string]: any;
}

interface FetchTodosResult {
  loading: boolean;
  error: string | null;
  todos: Todo;
  setTodos: React.Dispatch<React.SetStateAction<Todo>>;
}

const useFetchTodos = (): FetchTodosResult => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState({});

  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setTodos(docSnap.data().todos);
        } else {
          setTodos({});
        }
      } catch (error: any) {
        console.log(error);
        setError("Error: Failed to load todos");
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, []);

  return { loading, error, todos, setTodos };
};

export default useFetchTodos;
