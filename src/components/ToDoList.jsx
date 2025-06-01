import { useQuery, useMutation } from "@apollo/client";
import { GET_TODOS, UPDATE_TODO, DELETE_TODO } from "../graphql/queries";
import ToDoItem from "./ToDoItem";

const TodoList = () => {
  const { loading, error, data } = useQuery(GET_TODOS);

  // No need to update the cache manually
  const [updateTodo] = useMutation(UPDATE_TODO);

  /**
   * Different ways to update the cache after deleting a todo
   * 1. refetchQueries
   * 2. writeQuery
   * 3. updateQuery
   */

  // 1. Use refetchQueries to update the cache
  // const [deleteTodo] = useMutation(DELETE_TODO, {
  //   refetchQueries: [{ query: GET_TODOS }],
  // });

  // 2. Use writeQuery to update the cache
  // const [deleteTodo] = useMutation(DELETE_TODO, {
  //   writeQuery: { query: GET_TODOS, data: { todos: data.todos.filter((todo) => todo.id !== deleteTodo.id) } },
  // });

  // 3. Use updateQuery to update the cache
  const [deleteTodo] = useMutation(DELETE_TODO, {
    update: (cache, { data: { deleteTodo } }) => {
      cache.updateQuery({ query: GET_TODOS }, (data) => {
        return {
          todos: data.todos.filter((todo) => todo.id !== deleteTodo.id),
        };
      });
    },
  });

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
