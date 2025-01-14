import { useQuery, useMutation } from "@apollo/client";
import { GET_TODOS, UPDATE_TODO, DELETE_TODO } from "../graphql/queries";
import ToDoItem from "./ToDoItem";

const TodoList = () => {
  const { loading, error, data } = useQuery(GET_TODOS);

  const [updateTodo] = useMutation(UPDATE_TODO);
  const [deleteTodo] = useMutation(DELETE_TODO);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleToggle = (id, completed) => {
    updateTodo({
      variables: { id, completed: !completed },
    });
  };

  const handleDelete = (id) => {
    deleteTodo({
      variables: { id },
    });
  };

  return (
    <ul className="space-y-4">
      {data.todos.map((todo) => (
        <ToDoItem
          type="toDoList"
          key={todo.id}
          todo={todo}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      ))}
    </ul>
  );
};

export default TodoList;
