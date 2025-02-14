import React from 'react';
import type { TodoFilters as FilterType } from '../types';

interface TodoFiltersProps {
  filters: FilterType;
  onFilterChange: (filters: FilterType) => void;
  todoCount: {
    active: number;
    completed: number;
  };
}

export function TodoFilters({ filters, onFilterChange, todoCount }: TodoFiltersProps) {
  const filterButtons = [
    { label: 'Active', value: 'active', count: todoCount.active },
    { label: 'Completed', value: 'completed', count: todoCount.completed },
  ] as const;

  return (
    <div className="flex gap-2">
      {filterButtons.map(({ label, value, count }) => (
        <button
          key={value}
          onClick={() => onFilterChange({ ...filters, status: value })}
          className={`px-4 py-2 rounded-lg transition-all ${
            filters.status === value
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {label} ({count})
        </button>
      ))}
    </div>
  );
}
