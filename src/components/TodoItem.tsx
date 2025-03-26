import { Todo } from "../types/todo";

interface Props {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export const TodoItem: React.FC<Props> = ({ todo, onToggle, onDelete }) => {
  return (
    <tr className="todo-item">
      <td>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
      </td>
      <td className={todo.completed ? "todo-text completed" : "todo-text"}>{todo.text}</td>
      <td>
        <button className="todo-delete" onClick={() => onDelete(todo.id)}>Удалить</button>
      </td>
    </tr>
  );
};
