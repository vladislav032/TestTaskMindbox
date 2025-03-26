import { render, screen, fireEvent } from "@testing-library/react";
import { TodoList } from "../components/TodoList";
import { Todo } from "../types/todo";
import '@testing-library/jest-dom'; 

describe("TodoList Component", () => {
  const mockTodos: Todo[] = [
    { id: 1, text: "Test Todo 1", completed: false },
    { id: 2, text: "Test Todo 2", completed: true },
  ];

  const mockOnToggle = jest.fn();
  const mockOnDelete = jest.fn();

  test("renders TodoList with correct number of items", () => {
    render(<TodoList todos={mockTodos} onToggle={mockOnToggle} onDelete={mockOnDelete} />);
    
    // Проверка, что два элемента списка рендерятся
    expect(screen.getAllByRole("checkbox")).toHaveLength(mockTodos.length);
    expect(screen.getByText("Test Todo 1")).toBeInTheDocument();
    expect(screen.getByText("Test Todo 2")).toBeInTheDocument();
  });

  test("calls onToggle function when checkbox is clicked", () => {
    render(<TodoList todos={mockTodos} onToggle={mockOnToggle} onDelete={mockOnDelete} />);
    
    // Найти checkbox и кликнуть по нему
    const checkbox = screen.getAllByRole("checkbox")[0];
    fireEvent.click(checkbox);

    // Проверить, что функция onToggle была вызвана с правильным id
    expect(mockOnToggle).toHaveBeenCalledWith(mockTodos[0].id);
  });

  test("calls onDelete function when delete button is clicked", () => {
    render(<TodoList todos={mockTodos} onToggle={mockOnToggle} onDelete={mockOnDelete} />);
    
    // Найти кнопку удаления и кликнуть по ней
    const deleteButton = screen.getAllByRole("button")[0];
    fireEvent.click(deleteButton);

    // Проверить, что функция onDelete была вызвана с правильным id
    expect(mockOnDelete).toHaveBeenCalledWith(mockTodos[0].id);
  });
});
