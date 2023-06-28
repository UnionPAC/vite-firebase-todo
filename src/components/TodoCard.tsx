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
    <div className="flex w-[400px] justify-between mx-auto mt-6">
      {/* To-do name here */}
      <div className="flex">
        {!(edit === todoKey) ? (
          <>{children}</>
        ) : (
          <input
            value={edittedValue}
            onChange={(e) => setEdittedValue(e.target.value)}
          />
        )}
      </div>
      <div className="space-x-6">
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
