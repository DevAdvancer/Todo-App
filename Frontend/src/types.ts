export interface Todo {
  id: string;
  todo: string;
  status: boolean;
  createdAt?: string;
}

export interface TodoFilters {
  status: 'active' | 'completed';
}
