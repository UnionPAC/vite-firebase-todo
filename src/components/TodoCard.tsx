const TodoCard = (props: any) => {
  const {
    children,
    handleEditMode,
    editTodo,
    edit,
    todoKey,
    edittedValue,
    setEdittedValue,
    deleteTodo,
  } = props;
  return (
    <div className="mt-6 flex justify-between">
      {/* To-do name here */}
      <div className="w-[100%] max-w-[200px] sm:max-w-[400px]">
        {!(edit === todoKey) ? (
          <div>{children}</div>
        ) : (
          <input
            value={edittedValue}
            onChange={(e) => setEdittedValue(e.target.value)}
            className="flex-1 w-full p-2"
          />
        )}
      </div>
      <div className="ml-4 space-x-4">
        {edit === todoKey ? (
          <i
            onClick={editTodo}
            className="fa-solid fa-check cursor-pointer"
          ></i>
        ) : (
          <i
            onClick={handleEditMode(todoKey)}
            className="fa-solid fa-pencil cursor-pointer"
          ></i>
        )}
        <i
          onClick={deleteTodo(todoKey)}
          className="fa-solid fa-trash cursor-pointer"
        ></i>
      </div>
    </div>
  );
};

export default TodoCard;
