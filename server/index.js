import { ApolloServer, gql } from "apollo-server";
import { v4 as uuidv4 } from "uuid";

let todos = [
  { id: uuidv4(), text: "Tidy common areas", completed: false },
  { id: uuidv4(), text: "Empty trash", completed: false },
  { id: uuidv4(), text: "Wash dishes", completed: true },
];

const typeDefs = gql`
  type Todo {
    id: ID!
    text: String!
    completed: Boolean!
  }

  type Query {
    todos(completed: Boolean): [Todo!]!
  }

  type Mutation {
    addTodo(text: String!): Todo!
    updateTodo(id: ID!, completed: Boolean!): Todo!
    deleteTodo(id: ID!): Todo!
  }
`;

const resolvers = {
  Query: {
    todos: (_, { completed }) =>
      completed === undefined
        ? todos
        : todos.filter((todo) => todo.completed === completed),
  },
  Mutation: {
    addTodo: (_, { text }) => {
      const todo = {
        id: uuidv4(),
        text,
        completed: false,
      };
      todos.push(todo);
      return todo;
    },
    updateTodo: (_, { id, completed }) => {
      const todo = todos.find((t) => t.id === id);
      if (todo) {
        todo.completed = completed;
      }
      return todo;
    },
    deleteTodo: (_, { id }) => {
      const todo = todos.find((t) => t.id === id);
      todos = todos.filter((t) => t.id !== id);
      return todo;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
