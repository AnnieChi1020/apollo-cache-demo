import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_TODO, GET_TODOS } from "../graphql/queries";

const AddTodo = () => {
  const [text, setText] = useState("");

  /**
   * Different ways to update the cache after adding a todo
   * 1. refetchQueries
   * 2. writeQuery
   * 3. updateQuery
   * 4. optimisticResponse
   */

  // 1. Use refetchQueries to update the cache
  // const [addTodo] = useMutation(ADD_TODO, {
  //   refetchQueries: [{ query: GET_TODOS }],
  // });

  // 2. Use writeQuery to update the cache
  // const [addTodo] = useMutation(ADD_TODO, {
  //   writeQuery: { query: GET_TODOS, data: { todos: [...todos, newTodo] } },
  // });

  // 3. Use updateQuery to update the cache
  // const [addTodo] = useMutation(ADD_TODO, {
  //   update: (cache, { data: { addTodo } }) => {
  //     cache.updateQuery({ query: GET_TODOS }, (data) => ({
  //       todos: [...data.todos, addTodo],
  //     }));
  //   },
  // });

  // 4. Use optimisticResponse to provide immediate feedback
  const [addTodo] = useMutation(ADD_TODO, {
    optimisticResponse: {
      addTodo: { id: "optimistic-id", text, completed: false },
    },
    update: (cache, { data: { addTodo } }) => {
      cache.updateQuery({ query: GET_TODOS }, (data) => ({
        todos: [...data.todos, addTodo],
      }));
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    addTodo({
      variables: { text },
    });

    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex gap-4">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new todo..."
          className="flex-1 p-2 border rounded"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default AddTodo;
