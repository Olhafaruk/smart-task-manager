//src/pages/Register.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiAuth } from '../api/apiAuth';

export default function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('The passwords don’t match');
      return;
    }

    try {
      const response = await apiAuth('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        setError(data?.detail || 'Registration error');
        return;
      }

      setSuccess('Registration successful! Redirecting...');
      setTimeout(() => navigate('/'), 1500);
    } catch {
      setError('Server connection error');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
      <form
        onSubmit={handleRegister}
        className="bg-slate-800 p-8 rounded-lg shadow-lg w-96 space-y-6"
      >
        <h1 className="text-3xl font-bold text-center">Register</h1>

        {error && (
          <div className="bg-red-600 text-white p-2 rounded text-center">{error}</div>
        )}

        {success && (
          <div className="bg-green-600 text-white p-2 rounded text-center">{success}</div>
        )}

        <div>
          <label htmlFor="email" className="block mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full p-2 rounded bg-slate-700 border border-slate-600"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="w-full p-2 rounded bg-slate-700 border border-slate-600"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block mb-1">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            className="w-full p-2 rounded bg-slate-700 border border-slate-600"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded font-semibold"
        >
          Register
        </button>

        <p className="text-center text-sm">
          Already have an account?{' '}
          <a href="/" className="text-blue-400 hover:underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}
