import { render, screen, fireEvent } from '@testing-library/react';
import { TodoAll } from '../components/state-сomponents/TodoAll';
import { Todo } from '../types/todo';
import '@testing-library/jest-dom';

describe('TodoAll', () => {
  const mockToggle = jest.fn();
  const mockDelete = jest.fn();

  const sampleTodos: Todo[] = [
    { id: 1, text: 'Задача 1', completed: false },
    { id: 2, text: 'Задача 2', completed: true },
    { id: 3, text: 'Задача 3', completed: false },
  ];

  beforeEach(() => {
    mockToggle.mockClear();
    mockDelete.mockClear();
  });

  it('рендерит все задачи независимо от их статуса', () => {
    render(<TodoAll todos={sampleTodos} onToggle={mockToggle} onDelete={mockDelete} />);
    
    // Проверяем что все задачи отрендерены
    expect(screen.getByText('Задача 1')).toBeInTheDocument();
    expect(screen.getByText('Задача 2')).toBeInTheDocument();
    expect(screen.getByText('Задача 3')).toBeInTheDocument();
    
    // Проверяем количество строк с задачами
    const taskRows = screen.getAllByRole('row').filter(row => 
      row.classList.contains('todo-item')
    );
    expect(taskRows).toHaveLength(3);
  });

  it('вызывает onToggle с правильным id при клике на чекбокс', () => {
    render(<TodoAll todos={sampleTodos} onToggle={mockToggle} onDelete={mockDelete} />);
    
    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[1]); // Кликаем на второй чекбокс
    
    expect(mockToggle).toHaveBeenCalledTimes(1);
    expect(mockToggle).toHaveBeenCalledWith(2);
  });

  it('вызывает onDelete с правильным id при клике на кнопку удаления', () => {
    render(<TodoAll todos={sampleTodos} onToggle={mockToggle} onDelete={mockDelete} />);
    
    const deleteButtons = screen.getAllByRole('button', { name: /удалить/i });
    fireEvent.click(deleteButtons[0]); // Кликаем на первую кнопку удаления
    
    expect(mockDelete).toHaveBeenCalledTimes(1);
    expect(mockDelete).toHaveBeenCalledWith(1);
  });

  it('корректно отображает статус задач (выполнены/не выполнены)', () => {
    render(<TodoAll todos={sampleTodos} onToggle={mockToggle} onDelete={mockDelete} />);
    
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes[0]).not.toBeChecked(); // Задача 1 не выполнена
    expect(checkboxes[1]).toBeChecked();     // Задача 2 выполнена
    expect(checkboxes[2]).not.toBeChecked(); // Задача 3 не выполнена
  });

  it('не рендерит ничего при пустом списке задач', () => {
    render(<TodoAll todos={[]} onToggle={mockToggle} onDelete={mockDelete} />);
    
    const taskRows = screen.queryAllByRole('row').filter(row => 
      row.classList.contains('todo-item')
    );
    expect(taskRows).toHaveLength(0);
  });
});