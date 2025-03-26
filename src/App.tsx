import { useState } from "react";
import { TodoInput } from "./components/TodoInput";
import { TodoAll } from "./components/TodoAll";
import { TodoActive } from "./components/TodoActive";
import { TodoCompleted } from "./components/TodoCompleted";
import { useTodos } from "./hooks/useTodos";

export const App: React.FC = () => {
  const { todos, addTodo, toggleTodo, deleteTodo, clearCompleted } = useTodos();
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  return (
    <div className="todo-container">
      <h1 className="todo-header">todos</h1>
      <div className="todo-input-container">
        <TodoInput onAdd={addTodo} />
      </div>

      {/* Контейнер с прокруткой */}
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
            {filter === "all" && <TodoAll todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />}
            {filter === "active" && <TodoActive todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />}
            {filter === "completed" && <TodoCompleted todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />}
          </tbody>
        </table>
      </div>

      {/* Счетчик задач */}
      <div className="todo-footer">
        <span>{todos.length} items left</span>
      </div>

      {/* Footer в одну строку */}
      <div className="todo-footer">
        <div className="todo-filters">
          <button className={`todo-filter-button ${filter === "all" ? "active" : ""}`} onClick={() => setFilter("all")}>
            All
          </button>
          <button className={`todo-filter-button ${filter === "active" ? "active" : ""}`} onClick={() => setFilter("active")}>
            Active
          </button>
          <button className={`todo-filter-button ${filter === "completed" ? "active" : ""}`} onClick={() => setFilter("completed")}>
            Completed
          </button>
          <button className="todo-filter-button clear" onClick={clearCompleted}>Clear completed</button>
        </div>
      </div>
    </div>
  );
};
