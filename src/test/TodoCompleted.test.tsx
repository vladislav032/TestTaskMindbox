import { render, screen, fireEvent } from '@testing-library/react';
import { TodoCompleted } from '../components/state-сomponents/TodoCompleted';
import { Todo } from '../types/todo';
import '@testing-library/jest-dom';

describe('TodoCompleted', () => {
  const mockToggle = jest.fn();
  const mockDelete = jest.fn();

  const sampleTodos: Todo[] = [
    { id: 1, text: 'Завершенная задача 1', completed: true },
    { id: 2, text: 'Незавершенная задача', completed: false },
    { id: 3, text: 'Завершенная задача 2', completed: true },
  ];

  beforeEach(() => {
    mockToggle.mockClear();
    mockDelete.mockClear();
  });

  it('рендерит только завершенные задачи', () => {
    render(<TodoCompleted todos={sampleTodos} onToggle={mockToggle} onDelete={mockDelete} />);
    
    // Проверяем количество строк с задачами
    const taskRows = screen.getAllByRole('row').filter(row => 
      row.classList.contains('todo-item')
    );
    expect(taskRows).toHaveLength(2);
    
    // Проверяем текст задач
    expect(screen.getByText('Завершенная задача 1')).toBeInTheDocument();
    expect(screen.getByText('Завершенная задача 2')).toBeInTheDocument();
    expect(screen.queryByText('Незавершенная задача')).not.toBeInTheDocument();
  });

  it('вызывает onToggle при клике на чекбокс', () => {
    render(<TodoCompleted todos={sampleTodos} onToggle={mockToggle} onDelete={mockDelete} />);
    
    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[0]);
    
    expect(mockToggle).toHaveBeenCalledTimes(1);
    expect(mockToggle).toHaveBeenCalledWith(1);
  });

  it('вызывает onDelete при клике на кнопку удаления', () => {
    render(<TodoCompleted todos={sampleTodos} onToggle={mockToggle} onDelete={mockDelete} />);
    
    const deleteButtons = screen.getAllByRole('button', { name: /удалить/i });
    fireEvent.click(deleteButtons[0]);
    
    expect(mockDelete).toHaveBeenCalledTimes(1);
    expect(mockDelete).toHaveBeenCalledWith(1);
  });

  it('не рендерит строки задач, если нет завершенных задач', () => {
    const todosWithoutCompleted: Todo[] = [
      { id: 1, text: 'Незавершенная задача 1', completed: false },
      { id: 2, text: 'Незавершенная задача 2', completed: false },
    ];
    
    render(<TodoCompleted todos={todosWithoutCompleted} onToggle={mockToggle} onDelete={mockDelete} />);
    
    const taskRows = screen.queryAllByRole('row').filter(row => 
      row.classList.contains('todo-item')
    );
    expect(taskRows).toHaveLength(0);
  });

  it('корректно отображает количество завершенных задач', () => {
    const { rerender } = render(
      <TodoCompleted todos={sampleTodos} onToggle={mockToggle} onDelete={mockDelete} />
    );
    
    let taskRows = screen.getAllByRole('row').filter(row => 
      row.classList.contains('todo-item')
    );
    expect(taskRows).toHaveLength(2);

    const newTodos = [...sampleTodos, { id: 4, text: 'Новая завершенная', completed: true }];
    rerender(<TodoCompleted todos={newTodos} onToggle={mockToggle} onDelete={mockDelete} />);
    
    taskRows = screen.getAllByRole('row').filter(row => 
      row.classList.contains('todo-item')
    );
    expect(taskRows).toHaveLength(3);
  });
});