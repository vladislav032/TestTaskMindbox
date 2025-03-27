import { render, screen } from '@testing-library/react';
import { TodoTable } from '../components/TodoTable';
import '@testing-library/jest-dom';

// Мокаем дочерние компоненты с правильными путями
jest.mock('../components/TodoAll', () => ({
  TodoAll: () => <tbody data-testid="todo-all-body" />
}));

jest.mock('../components/TodoActive', () => ({
  TodoActive: () => <tbody data-testid="todo-active-body" />
}));

jest.mock('../components/TodoCompleted', () => ({
  TodoCompleted: () => <tbody data-testid="todo-completed-body" />
}));

describe('TodoTable', () => {
  const mockTodos = [
    { id: 1, text: 'Задачка 1', completed: false },
    { id: 2, text: 'Задачка 2', completed: true },
    { id: 3, text: 'Задачка 3', completed: false },
  ];

  const mockToggle = jest.fn();
  const mockDelete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('отображает TodoAll при фильтре "all"', () => {
    render(<TodoTable todos={mockTodos} filter="all" onToggle={mockToggle} onDelete={mockDelete} />);
    
    expect(screen.getByTestId('todo-all-body')).toBeInTheDocument();
    expect(screen.queryByTestId('todo-active-body')).not.toBeInTheDocument();
    expect(screen.queryByTestId('todo-completed-body')).not.toBeInTheDocument();
  });

  it('отображает TodoActive при фильтре "active"', () => {
    render(<TodoTable todos={mockTodos} filter="active" onToggle={mockToggle} onDelete={mockDelete} />);
    
    expect(screen.getByTestId('todo-active-body')).toBeInTheDocument();
    expect(screen.queryByTestId('todo-all-body')).not.toBeInTheDocument();
    expect(screen.queryByTestId('todo-completed-body')).not.toBeInTheDocument();
  });

  it('отображает TodoCompleted при фильтре "completed"', () => {
    render(<TodoTable todos={mockTodos} filter="completed" onToggle={mockToggle} onDelete={mockDelete} />);
    
    expect(screen.getByTestId('todo-completed-body')).toBeInTheDocument();
    expect(screen.queryByTestId('todo-all-body')).not.toBeInTheDocument();
    expect(screen.queryByTestId('todo-active-body')).not.toBeInTheDocument();
  });

  it('имеет правильную структуру таблицы', () => {
    const { container } = render(
      <TodoTable todos={mockTodos} filter="all" onToggle={mockToggle} onDelete={mockDelete} />
    );
    
    const table = container.querySelector('table.todo-table');
    expect(table).toBeInTheDocument();
    
    const thead = table?.querySelector('thead');
    expect(thead).toBeInTheDocument();
    
    const tbody = table?.querySelector('tbody');
    expect(tbody).toBeInTheDocument();
    
    const rows = thead?.querySelectorAll('tr');
    expect(rows).toHaveLength(1);
    
    const headers = rows?.[0].querySelectorAll('th');
    expect(headers).toHaveLength(3);
  });
});