import { useQuery, useMutation } from "@apollo/client";
import { GET_TODOS, UPDATE_TODO, DELETE_TODO } from "../graphql/queries";
import ToDoItem from "./ToDoItem";

const TodoList = () => {
  const { loading, error, data } = useQuery(GET_TODOS);

  const [updateTodo] = useMutation(UPDATE_TODO, {
    // Update the DoneList cache when a todo is completed / uncompleted
    update: (cache, { data: { updateTodo } }) => {
      cache.updateQuery(
        { query: GET_TODOS, variables: { completed: true } },
        (existingData) => ({
          todos: updateTodo.completed
            ? [...existingData.todos, updateTodo]
            : existingData.todos.filter((todo) => todo.id !== updateTodo.id),
        })
      );
    },
  });

  /**
   * Different ways to update the cache after deleting a todo
   * 1. refetchQueries
   * 2. writeQuery
   * 3. updateQuery
   */

  // 1. Use refetchQueries to update the cache
  // const [deleteTodo] = useMutation(DELETE_TODO, {
  //   refetchQueries: [
  //     { query: GET_TODOS },
  //     { query: GET_TODOS, variables: { completed: true } },
  //   ],
  // });

  // 2. Use writeQuery to update the cache
  // const [deleteTodo] = useMutation(DELETE_TODO, {
  //   update: (cache, { data: { deleteTodo } }) => {
  //     // Update main todo list
  //     cache.writeQuery({
  //       query: GET_TODOS,
  //       data: { todos: data.todos.filter((todo) => todo.id !== deleteTodo.id) },
  //     });

  //     // Update DoneList (completed todos)
  //     cache.writeQuery({
  //       query: GET_TODOS,
  //       variables: { completed: true },
  //       data: {
  //         todos: data.todos.filter(
  //           (todo) => todo.completed && todo.id !== deleteTodo.id
  //         ),
  //       },
  //     });
  //   },
  // });

  // 3. Use updateQuery to update the cache
  const [deleteTodo] = useMutation(DELETE_TODO, {
    update: (cache, { data: { deleteTodo } }) => {
      cache.updateQuery({ query: GET_TODOS }, (data) => {
        return {
          todos: data.todos.filter((todo) => todo.id !== deleteTodo.id),
        };
      });

      // Update the DoneList cache as well when a todo is deleted
      cache.updateQuery(
        { query: GET_TODOS, variables: { completed: true } },
        (data) => {
          return {
            todos: data.todos.filter((todo) => todo.id !== deleteTodo.id),
          };
        }
      );
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
