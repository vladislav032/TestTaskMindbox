import { TodoAll } from "./state-сomponents/TodoAll";
import { TodoActive } from "./state-сomponents/TodoActive";
import { TodoCompleted } from "./state-сomponents/TodoCompleted";

interface TodoTableProps {
  todos: { id: number; text: string; completed: boolean }[];
  filter: "all" | "active" | "completed";
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export const TodoTable: React.FC<TodoTableProps> = ({ todos, filter, onToggle, onDelete }) => {
  return (
    <div className="todo-table-container">
      <table className="todo-table">
        <thead>
          <tr>
            <th>Done</th>
            <th>Task</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filter === "all" && <TodoAll todos={todos} onToggle={onToggle} onDelete={onDelete} />}
          {filter === "active" && <TodoActive todos={todos} onToggle={onToggle} onDelete={onDelete} />}
          {filter === "completed" && <TodoCompleted todos={todos} onToggle={onToggle} onDelete={onDelete} />}
        </tbody>
      </table>
    </div>
  );
};
