import PropTypes from "prop-types";

const ToDoItem = ({ type, todo, onToggle, onDelete }) => {
  const { id, text, completed } = todo;

  return (
    <li className="flex items-center justify-between p-4 bg-white rounded shadow">
      {type === "toDoList" && (
        <>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={completed}
              onChange={() => onToggle?.(id, completed)}
              className="mr-4"
            />
            <span className={completed ? "line-through text-gray-500" : ""}>
              {text}
            </span>
          </div>
          <button
            onClick={() => onDelete?.(id)}
            className="text-red-500 hover:text-red-700"
          >
            Delete
          </button>
        </>
      )}

      {type === "doneList" && (
        <div className="flex items-center">
          <span className="text-gray-500">{text}</span>
        </div>
      )}
    </li>
  );
};

export default ToDoItem;

ToDoItem.propTypes = {
  type: PropTypes.string.isRequired,
  todo: PropTypes.object.isRequired,
  onToggle: PropTypes.func,
  onDelete: PropTypes.func,
};
