//src/pages/Login.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiAuth } from "../api/apiAuth";


export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    try {
      const response = await apiAuth('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        setError('Incorrect email or password');
        return;
      }

      const data = await response.json();
      localStorage.setItem('token', data.access_token);

      navigate('/tasks');
    } catch {
      setError('Server connection error');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
      <form
        onSubmit={handleLogin}
        className="bg-slate-800 p-8 rounded-lg shadow-lg w-96 space-y-6"
      >
        <h1 className="text-3xl font-bold text-center">Login</h1>

        {error && (
          <div className="bg-red-600 text-white p-2 rounded text-center">{error}</div>
        )}

        <div>
            <label htmlFor="email" className="block mb-1">Email</label>
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
            <label htmlFor="password" className="block mb-1">Password</label>
            <input
                id="password"
                type="password"
                className="w-full p-2 rounded bg-slate-700 border border-slate-600"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
        </div>


        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded font-semibold"
        >
          Login
        </button>

        <p className="text-center text-sm">
          No account?{' '}
          <a href="/register" className="text-blue-400 hover:underline">
            Register
          </a>
        </p>
      </form>
    </div>
  );
}
