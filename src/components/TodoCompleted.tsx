import { TodoList } from "./TodoList";
import { Todo } from "../types/todo";

interface TodoCompletedProps {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export const TodoCompleted: React.FC<TodoCompletedProps> = ({ todos, onToggle, onDelete }) => {
  const completedTodos = todos.filter(todo => todo.completed);
  return <TodoList todos={completedTodos} onToggle={onToggle} onDelete={onDelete} />;
};
