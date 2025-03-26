import { TodoList } from "./TodoList";
import { Todo } from "../types/todo";

interface TodoAllProps {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export const TodoAll: React.FC<TodoAllProps> = ({ todos, onToggle, onDelete }) => {
  return <TodoList todos={todos} onToggle={onToggle} onDelete={onDelete} />;
};
