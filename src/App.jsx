import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import TodoList from "./components/ToDoList";
import AddTodo from "./components/AddToDo";
import DoneList from "./components/DoneList";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="max-w-5xl mx-auto px-6 py-12 flex flex-row gap-4">
        <div className="bg-blue-100 p-4 rounded-md flex-1">
          <h2 className="text-xl font-bold mb-6 text-center">To Do List</h2>
          <AddTodo />
          <TodoList />
        </div>
        <div className="bg-gray-100 p-4 rounded-md flex-1">
          <h2 className="text-xl font-bold mb-6 text-center">Done List</h2>
          <DoneList />
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
