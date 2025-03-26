import { render, screen, fireEvent } from "@testing-library/react";
import { TodoInput } from "../components/TodoInput";

test("добавляет задачу при вводе текста и нажатии кнопки", () => {
  const addTodoMock = jest.fn();
  render(<TodoInput onAdd={addTodoMock} />);

  const input = screen.getByPlaceholderText("Что нужно сделать?");
  const button = screen.getByText("Добавить");

  fireEvent.change(input, { target: { value: "Новая задача" } });
  fireEvent.click(button);

  expect(addTodoMock).toHaveBeenCalledWith("Новая задача");
});
