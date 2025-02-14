import React, { useState } from 'react';
import { Check, Trash2, Edit2, X, Save } from 'lucide-react';
import type { Todo } from '../types';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newTitle: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.todo);

  const handleSave = () => {
    if (editValue.trim() && editValue !== todo.todo) {
      onEdit(todo.id, editValue.trim());
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(todo.todo);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div className="group flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm transition-all hover:shadow-md">
      <button
        onClick={() => onToggle(todo.id)}
        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors
          ${todo.status
            ? 'bg-green-500 border-green-500 text-white'
            : 'border-gray-300 hover:border-green-500'
          }`}
      >
        {todo.status && <Check size={14} />}
      </button>

      {isEditing ? (
        <div className="flex-1 flex items-center gap-2">
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
          <button
            onClick={handleSave}
            className="text-green-500 hover:text-green-600"
            title="Save"
          >
            <Save size={18} />
          </button>
          <button
            onClick={handleCancel}
            className="text-gray-400 hover:text-gray-500"
            title="Cancel"
          >
            <X size={18} />
          </button>
        </div>
      ) : (
        <span className="flex-1 text-gray-800">
          {todo.todo}
        </span>
      )}

      {!isEditing && (
        <div className="opacity-0 group-hover:opacity-100 flex items-center gap-2">
          <button
            onClick={() => setIsEditing(true)}
            className="text-gray-400 hover:text-blue-500 transition-all"
            title="Edit"
          >
            <Edit2 size={18} />
          </button>
          <button
            onClick={() => onDelete(todo.id)}
            className="text-gray-400 hover:text-red-500 transition-all"
            title="Delete"
          >
            <Trash2 size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
