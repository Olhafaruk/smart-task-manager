import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Register from '../pages/Register';
import { vi } from 'vitest';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

vi.mock('../api/apiAuth', () => ({
  apiAuth: vi.fn(),
}));

test('Register: shows error when passwords do not match', async () => {
  render(
    <BrowserRouter>
      <Register />
    </BrowserRouter>,
  );

  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/^password$/i);
  const confirmInput = screen.getByLabelText(/confirm password/i);
  const button = screen.getByRole('button', { name: /register/i });

  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: '123456' } });
  fireEvent.change(confirmInput, { target: { value: '654321' } });

  fireEvent.click(button);

  expect(await screen.findByText(/don’t match/i)).toBeInTheDocument();

  const { apiAuth } = await import('../api/apiAuth');
  expect(apiAuth).not.toHaveBeenCalled();
});
