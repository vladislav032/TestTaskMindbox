import { render, screen, fireEvent } from "@testing-library/react";
import { TodoList } from "../components/TodoList";
import { Todo } from "../types/todo";
import '@testing-library/jest-dom'; 

describe("Компонент TodoList", () => {
  // Массив с тестовыми задачами
  const mockTodos: Todo[] = [
    { id: 1, text: "Тестовая задача 1", completed: false },
    { id: 2, text: "Тестовая задача 2", completed: true },
  ];

  // Моки функций-обработчиков
  const mockOnToggle = jest.fn();
  const mockOnDelete = jest.fn();

  it("рендерит TodoList с правильным количеством элементов", () => {
    render(<TodoList todos={mockTodos} onToggle={mockOnToggle} onDelete={mockOnDelete} />);
    
    // Проверяем, что рендерятся два элемента списка
    expect(screen.getAllByRole("checkbox")).toHaveLength(mockTodos.length);
    expect(screen.getByText("Тестовая задача 1")).toBeInTheDocument();
    expect(screen.getByText("Тестовая задача 2")).toBeInTheDocument();
  });

  it("вызывает функцию onToggle при нажатии на чекбокс", () => {
    render(<TodoList todos={mockTodos} onToggle={mockOnToggle} onDelete={mockOnDelete} />);
    
    // Находим чекбокс и кликаем по нему
    const checkbox = screen.getAllByRole("checkbox")[0];
    fireEvent.click(checkbox);

    // Проверяем, что функция onToggle вызвана с правильным id
    expect(mockOnToggle).toHaveBeenCalledWith(mockTodos[0].id);
  });

  it("вызывает функцию onDelete при нажатии на кнопку удаления", () => {
    render(<TodoList todos={mockTodos} onToggle={mockOnToggle} onDelete={mockOnDelete} />);
    
    // Находим кнопку удаления и кликаем по ней
    const deleteButton = screen.getAllByRole("button")[0];
    fireEvent.click(deleteButton);

    // Проверяем, что функция onDelete вызвана с правильным id
    expect(mockOnDelete).toHaveBeenCalledWith(mockTodos[0].id);
  });
});
