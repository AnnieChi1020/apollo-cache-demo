import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_TODO } from "../graphql/queries";

const AddTodo = () => {
  const [text, setText] = useState("");

  const [addTodo] = useMutation(ADD_TODO);

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
