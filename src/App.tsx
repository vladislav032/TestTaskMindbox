import { useState } from "react";
import { TodoInput } from "./components/TodoInput";
import { TodoTable } from "./components/TodoTable";
import { TodoFooter } from "./components/TodoFooter";
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

      <TodoTable todos={todos} filter={filter} onToggle={toggleTodo} onDelete={deleteTodo} />

      <TodoFooter
        todosCount={todos.length}
        filter={filter}
        setFilter={setFilter}
        clearCompleted={clearCompleted}
      />
    </div>
  );
};
