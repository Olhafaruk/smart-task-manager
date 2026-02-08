import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Tasks from '../pages/Tasks';
import { vi } from 'vitest';

// --- IMPORT HOOKS ---
import { useTasks } from '@/hooks/useTasks';
import { useTheme } from '@/context/useTheme';

// --- MOCK MODULES ---
vi.mock('@/hooks/useTasks');
vi.mock('@/context/useTheme');

// --- BASE MOCK ---
const baseMock = {
  loading: false,
  error: '',
  tasks: [],
  filteredTasks: [],
  newTask: '',
  editingId: null,
  editingText: '',
  showSettings: false,
  filter: 'all',

  setNewTask: vi.fn(),
  setEditingText: vi.fn(),
  setShowSettings: vi.fn(),
  setFilter: vi.fn(),

  addTask: vi.fn(),
  deleteTask: vi.fn(),
  startEdit: vi.fn(),
  cancelEdit: vi.fn(),
  saveTask: vi.fn(),
  toggleCompleted: vi.fn(),
  handleLogout: vi.fn(),
};

// --- THEME MOCK  ---
(useTheme as vi.Mock).mockReturnValue({
  themeStyle: 'minimal', // <-- существующая тема
});

// ----------------------
//       TESTS
// ----------------------

test('Tasks: shows loading spinner', () => {
  (useTasks as vi.Mock).mockReturnValue({
    ...baseMock,
    loading: true,
  });

  render(
    <BrowserRouter>
      <Tasks />
    </BrowserRouter>,
  );

  expect(screen.getByRole('status')).toBeInTheDocument();
});

test('Tasks: shows error message', () => {
  (useTasks as vi.Mock).mockReturnValue({
    ...baseMock,
    error: 'Server error',
  });

  render(
    <BrowserRouter>
      <Tasks />
    </BrowserRouter>,
  );

  expect(screen.getByText(/server error/i)).toBeInTheDocument();
});

test('Tasks: shows empty list message', () => {
  (useTasks as vi.Mock).mockReturnValue({
    ...baseMock,
    filteredTasks: [],
  });

  render(
    <BrowserRouter>
      <Tasks />
    </BrowserRouter>,
  );

  expect(screen.getByText(/no tasks found/i)).toBeInTheDocument();
});

test('Tasks: renders tasks list', () => {
  (useTasks as vi.Mock).mockReturnValue({
    ...baseMock,
    filteredTasks: [{ id: 1, title: 'Test task', completed: false }],
  });

  render(
    <BrowserRouter>
      <Tasks />
    </BrowserRouter>,
  );

  expect(screen.getByText('Test task')).toBeInTheDocument();
});

test('Tasks: calls addTask', () => {
  const addTask = vi.fn();

  (useTasks as vi.Mock).mockReturnValue({
    ...baseMock,
    addTask,
  });

  render(
    <BrowserRouter>
      <Tasks />
    </BrowserRouter>,
  );

  fireEvent.click(screen.getByRole('button', { name: /add/i }));

  expect(addTask).toHaveBeenCalled();
});

test('Tasks: calls deleteTask', () => {
  const deleteTask = vi.fn();

  (useTasks as vi.Mock).mockReturnValue({
    ...baseMock,
    filteredTasks: [{ id: 1, title: 'Test', completed: false }],
    deleteTask,
  });

  render(
    <BrowserRouter>
      <Tasks />
    </BrowserRouter>,
  );

  fireEvent.click(screen.getByRole('button', { name: /delete/i }));

  expect(deleteTask).toHaveBeenCalledWith(1);
});

test('Tasks: calls startEdit', () => {
  const startEdit = vi.fn();

  (useTasks as vi.Mock).mockReturnValue({
    ...baseMock,
    filteredTasks: [{ id: 1, title: 'Test', completed: false }],
    startEdit,
  });

  render(
    <BrowserRouter>
      <Tasks />
    </BrowserRouter>,
  );

  fireEvent.click(screen.getByRole('button', { name: /edit/i }));

  expect(startEdit).toHaveBeenCalled();
});

test('Tasks: filter buttons call setFilter', () => {
  const setFilter = vi.fn();

  (useTasks as vi.Mock).mockReturnValue({
    ...baseMock,
    setFilter,
  });

  render(
    <BrowserRouter>
      <Tasks />
    </BrowserRouter>,
  );

  fireEvent.click(screen.getByRole('button', { name: /active/i }));

  expect(setFilter).toHaveBeenCalledWith('active');
});

test('Tasks: settings panel is visible', () => {
  (useTasks as vi.Mock).mockReturnValue({
    ...baseMock,
    showSettings: true,
  });

  render(
    <BrowserRouter>
      <Tasks />
    </BrowserRouter>,
  );

  expect(screen.getByTitle(/settings/i)).toBeInTheDocument();
});
