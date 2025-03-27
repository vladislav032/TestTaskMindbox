import { render, screen, fireEvent } from "@testing-library/react";
import { TodoTable } from "../components/TodoTable";
import "@testing-library/jest-dom";

describe("Компонент TodoTable", () => {
  const mockTodos = [
    { id: 1, text: "Задача 1", completed: false },
    { id: 2, text: "Задача 2", completed: true },
  ];
  const mockOnToggle = jest.fn();
  const mockOnDelete = jest.fn();
  
  it("отображает компонент TodoAll при фильтре 'all'", () => {
    render(
      <TodoTable todos={mockTodos} filter="all" onToggle={mockOnToggle} onDelete={mockOnDelete} />
    );
    expect(screen.getByText("Задача 1")).toBeInTheDocument();
    expect(screen.getByText("Задача 2")).toBeInTheDocument();
  });

  it("вызывает onToggle при клике по чекбоксу", () => {
    render(
      <TodoTable todos={mockTodos} filter="all" onToggle={mockOnToggle} onDelete={mockOnDelete} />
    );
    const checkboxes = screen.getAllByRole("checkbox");
    fireEvent.click(checkboxes[0]);
    expect(mockOnToggle).toHaveBeenCalledWith(1);
  });

  it("вызывает onDelete при нажатии кнопки удаления", () => {
    render(
      <TodoTable todos={mockTodos} filter="all" onToggle={mockOnToggle} onDelete={mockOnDelete} />
    );
    const deleteButtons = screen.getAllByText("Удалить");
    fireEvent.click(deleteButtons[0]);
    expect(mockOnDelete).toHaveBeenCalledWith(1);
  });
});
