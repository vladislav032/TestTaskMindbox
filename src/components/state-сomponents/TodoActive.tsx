import { TodoList } from "../TodoList";
import { Todo } from "../../types/todo";

interface TodoActiveProps {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export const TodoActive: React.FC<TodoActiveProps> = ({ todos, onToggle, onDelete }) => {
  const activeTodos = todos.filter(todo => !todo.completed);
  return <TodoList todos={activeTodos} onToggle={onToggle} onDelete={onDelete} />;
};
