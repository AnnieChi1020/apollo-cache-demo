import { useQuery } from "@apollo/client";
import { GET_TODOS } from "../graphql/queries";

import ToDoItem from "./ToDoItem";

const DoneList = () => {
  const { loading, error, data } = useQuery(GET_TODOS, {
    variables: { completed: true },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <ul className="space-y-4">
      {data.todos.map((todo) => (
        <ToDoItem type="doneList" key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};

export default DoneList;
