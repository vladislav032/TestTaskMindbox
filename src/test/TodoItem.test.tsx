import { render, screen, fireEvent } from "@testing-library/react";
import { TodoItem } from "../components/TodoItem";
import "@testing-library/jest-dom";
import { Todo } from "../types/todo";

describe("Компонент TodoItem", () => {
  const mockTodo: Todo = {
    id: 1,
    text: "Тестовая задача",
    completed: false,
  };

  const mockOnToggle = jest.fn();
  const mockOnDelete = jest.fn();

  it("рендерит задачу с правильным текстом", () => {
    render(<TodoItem todo={mockTodo} onToggle={mockOnToggle} onDelete={mockOnDelete} />);

    expect(screen.getByText("Тестовая задача")).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).not.toBeChecked();
  });

  it("вызывает onToggle при нажатии на чекбокс", () => {
    render(<TodoItem todo={mockTodo} onToggle={mockOnToggle} onDelete={mockOnDelete} />);

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    expect(mockOnToggle).toHaveBeenCalledTimes(1);
    expect(mockOnToggle).toHaveBeenCalledWith(1);
  });

  it("вызывает onDelete при нажатии на кнопку удаления", () => {
    render(<TodoItem todo={mockTodo} onToggle={mockOnToggle} onDelete={mockOnDelete} />);

    const deleteButton = screen.getByText("Удалить");
    fireEvent.click(deleteButton);

    expect(mockOnDelete).toHaveBeenCalledTimes(1);
    expect(mockOnDelete).toHaveBeenCalledWith(1);
  });

  it("применяет класс 'completed', когда задача завершена", () => {
    const completedTodo = { ...mockTodo, completed: true };
    render(<TodoItem todo={completedTodo} onToggle={mockOnToggle} onDelete={mockOnDelete} />);

    const todoText = screen.getByText("Тестовая задача");
    expect(todoText).toHaveClass("completed");
  });
});
