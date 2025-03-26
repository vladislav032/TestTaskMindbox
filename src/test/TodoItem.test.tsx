import { render, screen, fireEvent } from "@testing-library/react";
import { TodoItem } from "../components/TodoItem";
import "@testing-library/jest-dom";
import { Todo } from "../types/todo";

describe("TodoItem component", () => {
  const mockTodo: Todo = {
    id: 1,
    text: "Test Todo",
    completed: false,
  };

  const mockOnToggle = jest.fn();
  const mockOnDelete = jest.fn();

  test("renders todo item with correct text", () => {
    render(<TodoItem todo={mockTodo} onToggle={mockOnToggle} onDelete={mockOnDelete} />);

    expect(screen.getByText("Test Todo")).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).not.toBeChecked();
  });

  test("calls onToggle when checkbox is clicked", () => {
    render(<TodoItem todo={mockTodo} onToggle={mockOnToggle} onDelete={mockOnDelete} />);

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    expect(mockOnToggle).toHaveBeenCalledTimes(1);
    expect(mockOnToggle).toHaveBeenCalledWith(1);
  });

  test("calls onDelete when delete button is clicked", () => {
    render(<TodoItem todo={mockTodo} onToggle={mockOnToggle} onDelete={mockOnDelete} />);

    const deleteButton = screen.getByText("Удалить");
    fireEvent.click(deleteButton);

    expect(mockOnDelete).toHaveBeenCalledTimes(1);
    expect(mockOnDelete).toHaveBeenCalledWith(1);
  });

  test("applies 'completed' class when todo is completed", () => {
    const completedTodo = { ...mockTodo, completed: true };
    render(<TodoItem todo={completedTodo} onToggle={mockOnToggle} onDelete={mockOnDelete} />);

    const todoText = screen.getByText("Test Todo");
    expect(todoText).toHaveClass("completed");
  });
});
