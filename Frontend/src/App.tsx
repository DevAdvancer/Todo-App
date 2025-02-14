import React, { useState, useEffect } from 'react';
import { ListTodo } from 'lucide-react';
import { TodoInput } from './components/TodoInput';
import { TodoItem } from './components/TodoItem';
import { TodoFilters } from './components/TodoFilters';
import { getTodos, createTodo, updateTodo, deleteTodo } from './api';
import type { Todo, TodoFilters as FilterType } from './types';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filters, setFilters] = useState<FilterType>({ status: 'active' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTodos();
  }, []);

  async function loadTodos() {
    try {
      setLoading(true);
      const data = await getTodos();
      setTodos(data);
      setError(null);
    } catch (err) {
      setError('Failed to load todos');
    } finally {
      setLoading(false);
    }
  }

  const addTodo = async (title: string) => {
    try {
      const newTodo = await createTodo(title);
      await loadTodos();
      setError(null);
    } catch (err) {
      setError('Failed to add todo');
    }
  };

  const toggleTodo = async (id: string) => {
    try {
      const todo = todos.find(t => t.id === id);
      if (!todo) return;

      await updateTodo(id, !todo.status);
      await loadTodos();
      setError(null);
    } catch (err) {
      setError('Failed to update todo');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTodo(id);
      await loadTodos();
      setError(null);
    } catch (err) {
      setError('Failed to delete todo');
    }
  };

  const handleEdit = async (id: string, newTitle: string) => {
    try {
      const todo = todos.find(t => t.id === id);
      if (!todo) return;

      // Update the todo on the server (you'll need to add this endpoint)
      const response = await fetch(`${import.meta.env.VITE_API_URL}/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ todo: newTitle, status: todo.status }),
      });

      if (!response.ok) throw new Error('Failed to update todo');

      await loadTodos();
      setError(null);
    } catch (err) {
      setError('Failed to update todo');
    }
  };

  const filteredTodos = todos.filter(todo => {
    if (filters.status === 'active') return !todo.status;
    return todo.status; // completed
  });

  const todoCount = {
    active: todos.filter(t => !t.status).length,
    completed: todos.filter(t => t.status).length
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading todos...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto py-12 px-4">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <ListTodo size={32} className="text-blue-500" />
            <h1 className="text-3xl font-bold text-gray-900">Todo App</h1>
          </div>
          <p className="text-gray-600">Stay organized and get things done</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg">
            {error}
          </div>
        )}

        <div className="space-y-6">
          <TodoInput onAdd={addTodo} />

          <div className="flex justify-between items-center">
            <TodoFilters
              filters={filters}
              onFilterChange={setFilters}
              todoCount={todoCount}
            />
          </div>

          <div className="space-y-3">
            {filteredTodos.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                No {filters.status} todos to display
              </div>
            ) : (
              filteredTodos.map(todo => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={toggleTodo}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
