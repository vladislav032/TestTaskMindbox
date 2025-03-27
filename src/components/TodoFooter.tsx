interface TodoFooterProps {
    todosCount: number;
    filter: "all" | "active" | "completed";
    setFilter: (filter: "all" | "active" | "completed") => void;
    clearCompleted: () => void;
  }
  
  export const TodoFooter: React.FC<TodoFooterProps> = ({ todosCount, filter, setFilter, clearCompleted }) => {
    return (
      <>
        {/* Счетчик задач */}
        <div className="todo-footer">
          <span>{todosCount} items left</span>
        </div>
  
        {/* Footer с фильтрами */}
        <div className="todo-footer">
          <div className="todo-filters">
            <button className={`todo-filter-button ${filter === "all" ? "active" : ""}`} onClick={() => setFilter("all")}>
              All
            </button>
            <button className={`todo-filter-button ${filter === "active" ? "active" : ""}`} onClick={() => setFilter("active")}>
              Active
            </button>
            <button className={`todo-filter-button ${filter === "completed" ? "active" : ""}`} onClick={() => setFilter("completed")}>
              Completed
            </button>
            <button className="todo-filter-button clear" onClick={clearCompleted}>
              Clear completed
            </button>
          </div>
        </div>
      </>
    );
  };
  