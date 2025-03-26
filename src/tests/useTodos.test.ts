import { renderHook, act } from "@testing-library/react";
import { useTodos } from "./useTodos";

describe("useTodos hook", () => {
  it("добавляет новую задачу", () => {
    const { result } = renderHook(() => useTodos());

    act(() => {
      result.current.addTodo("Новая задача");
    });

    expect(result.current.todos).toHaveLength(1);
    expect(result.current.todos[0].text).toBe("Новая задача");
  });

  it("переключает выполнение задачи", () => {
    const { result } = renderHook(() => useTodos());

    act(() => {
      result.current.addTodo("Сделать тесты");
      result.current.toggleTodo(result.current.todos[0].id);
    });

    expect(result.current.todos[0].completed).toBe(true);
  });

  it("удаляет задачу", () => {
    const { result } = renderHook(() => useTodos());

    act(() => {
      result.current.addTodo("Удалить задачу");
      result.current.deleteTodo(result.current.todos[0].id);
    });

    expect(result.current.todos).toHaveLength(0);
  });

  it("очищает выполненные задачи", () => {
    const { result } = renderHook(() => useTodos());

    act(() => {
      result.current.addTodo("Тестовая задача 1");
      result.current.addTodo("Тестовая задача 2");
      result.current.toggleTodo(result.current.todos[0].id); // Выполняем первую задачу
      result.current.clearCompleted();
    });

    expect(result.current.todos).toHaveLength(1);
    expect(result.current.todos[0].text).toBe("Тестовая задача 2");
  });
});
