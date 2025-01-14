import PropTypes from "prop-types";

const ToDoItem = ({ todo, onToggle, onDelete }) => {
  const { id, text, completed } = todo;

  return (
    <li className="flex items-center justify-between p-4 bg-white rounded shadow">
      <div className="flex items-center">
        {!completed && (
          <input
            type="checkbox"
            checked={completed}
            onChange={() => onToggle?.(id, completed)}
            className="mr-4"
          />
        )}
        <span className={completed ? "line-through text-gray-500" : ""}>
          {text}
        </span>
      </div>
      {!completed && (
        <button
          onClick={() => onDelete?.(id)}
          className="text-red-500 hover:text-red-700"
        >
          Delete
        </button>
      )}
    </li>
  );
};

export default ToDoItem;

ToDoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  onToggle: PropTypes.func,
  onDelete: PropTypes.func,
};
