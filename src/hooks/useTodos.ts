import { useState } from "react";
import { Todo } from "../types/todo";

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (text: string) => {
    if (text.trim()) {
      setTodos([...todos, { id: Date.now(), text, completed: false }]);
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Очистка завершенных задач
  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  return { todos, addTodo, toggleTodo, deleteTodo, clearCompleted };
};
