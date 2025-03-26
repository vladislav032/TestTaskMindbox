import { render, screen, fireEvent } from '@testing-library/react';
import { TodoActive } from '../components/TodoActive';
import { Todo } from '../types/todo';
import '@testing-library/jest-dom';

describe('TodoActive', () => {
  const mockToggle = jest.fn();
  const mockDelete = jest.fn();

  const sampleTodos: Todo[] = [
    { id: 1, text: 'Активная задача 1', completed: false },
    { id: 2, text: 'Завершенная задача', completed: true },
    { id: 3, text: 'Активная задача 2', completed: false },
    { id: 4, text: 'Еще завершенная', completed: true },
  ];

  beforeEach(() => {
    mockToggle.mockClear();
    mockDelete.mockClear();
  });

  it('рендерит только активные (не завершенные) задачи', () => {
    render(<TodoActive todos={sampleTodos} onToggle={mockToggle} onDelete={mockDelete} />);
    
    // Проверяем что отображаются только активные задачи
    expect(screen.getByText('Активная задача 1')).toBeInTheDocument();
    expect(screen.getByText('Активная задача 2')).toBeInTheDocument();
    expect(screen.queryByText('Завершенная задача')).not.toBeInTheDocument();
    expect(screen.queryByText('Еще завершенная')).not.toBeInTheDocument();
    
    // Проверяем количество отрендеренных задач
    const taskRows = screen.getAllByRole('row').filter(row => 
      row.classList.contains('todo-item')
    );
    expect(taskRows).toHaveLength(2);
  });

  it('вызывает onToggle при клике на чекбокс активной задачи', () => {
    render(<TodoActive todos={sampleTodos} onToggle={mockToggle} onDelete={mockDelete} />);
    
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(2); // Должны быть только чекбоксы активных задач
    
    fireEvent.click(checkboxes[0]);
    expect(mockToggle).toHaveBeenCalledTimes(1);
    expect(mockToggle).toHaveBeenCalledWith(1);
  });

  it('вызывает onDelete при клике на кнопку удаления активной задачи', () => {
    render(<TodoActive todos={sampleTodos} onToggle={mockToggle} onDelete={mockDelete} />);
    
    const deleteButtons = screen.getAllByRole('button', { name: /удалить/i });
    expect(deleteButtons).toHaveLength(2); // Только для активных задач
    
    fireEvent.click(deleteButtons[1]); // Кликаем на вторую кнопку удаления
    expect(mockDelete).toHaveBeenCalledTimes(1);
    expect(mockDelete).toHaveBeenCalledWith(3);
  });

  it('не рендерит чекбоксы как отмеченные (активные задачи не завершены)', () => {
    render(<TodoActive todos={sampleTodos} onToggle={mockToggle} onDelete={mockDelete} />);
    
    const checkboxes = screen.getAllByRole('checkbox');
    checkboxes.forEach(checkbox => {
      expect(checkbox).not.toBeChecked();
    });
  });

  it('не рендерит ничего при отсутствии активных задач', () => {
    const completedTodos: Todo[] = [
      { id: 1, text: 'Завершенная 1', completed: true },
      { id: 2, text: 'Завершенная 2', completed: true },
    ];
    
    render(<TodoActive todos={completedTodos} onToggle={mockToggle} onDelete={mockDelete} />);
    
    const taskRows = screen.queryAllByRole('row').filter(row => 
      row.classList.contains('todo-item')
    );
    expect(taskRows).toHaveLength(0);
  });

  it('корректно обновляется при изменении props', () => {
    const { rerender } = render(
      <TodoActive todos={sampleTodos} onToggle={mockToggle} onDelete={mockDelete} />
    );
    
    // Первоначально 2 активные задачи
    expect(screen.getAllByRole('checkbox')).toHaveLength(2);
    
    // Добавляем новую активную задачу
    const newTodos = [...sampleTodos, { id: 5, text: 'Новая активная', completed: false }];
    rerender(<TodoActive todos={newTodos} onToggle={mockToggle} onDelete={mockDelete} />);
    
    // Теперь должно быть 3 активные задачи
    expect(screen.getAllByRole('checkbox')).toHaveLength(3);
    expect(screen.getByText('Новая активная')).toBeInTheDocument();
  });
});