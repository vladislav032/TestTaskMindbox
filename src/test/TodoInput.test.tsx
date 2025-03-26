import { render, screen, fireEvent } from "@testing-library/react";
import { TodoInput } from "../components/TodoInput";
import "@testing-library/jest-dom";

describe("TodoInput", () => {
  const mockOnAdd = jest.fn();

  beforeEach(() => {
    mockOnAdd.mockClear();
  });

  it("рендерит форму с input и button", () => {
    render(<TodoInput onAdd={mockOnAdd} />);
    
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /добавить/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/что нужно сделать\?/i)).toBeInTheDocument();
  });

  it("обновляет значение input при вводе текста", () => {
    render(<TodoInput onAdd={mockOnAdd} />);
    const input = screen.getByRole("textbox") as HTMLInputElement;
    
    fireEvent.change(input, { target: { value: "Новая задача" } });
    
    expect(input.value).toBe("Новая задача");
  });

  it("вызывает onAdd с текстом задачи при отправке формы", () => {
    render(<TodoInput onAdd={mockOnAdd} />);
    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button", { name: /добавить/i });
    
    fireEvent.change(input, { target: { value: "Новая задача" } });
    fireEvent.click(button);
    
    expect(mockOnAdd).toHaveBeenCalledTimes(1);
    expect(mockOnAdd).toHaveBeenCalledWith("Новая задача");
  });

  it("не вызывает onAdd при отправке пустой формы", () => {
    render(<TodoInput onAdd={mockOnAdd} />);
    const button = screen.getByRole("button", { name: /добавить/i });
    
    fireEvent.click(button);
    
    expect(mockOnAdd).not.toHaveBeenCalled();
  });

  it("очищает input после успешной отправки", () => {
    render(<TodoInput onAdd={mockOnAdd} />);
    const input = screen.getByRole("textbox") as HTMLInputElement;
    const button = screen.getByRole("button", { name: /добавить/i });
    
    fireEvent.change(input, { target: { value: "Новая задача" } });
    fireEvent.click(button);
    
    expect(input.value).toBe("");
  });
});