'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { saveUserRoleCookie, loginUser } from '@/lib/auth.service';
import { useAuth } from '../context/context';

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');
  const { setIsLoggedIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoginStatus('idle');
    setError('');

    const request: LoginRequest = { username, password };

    try {
      await loginUser(request);
      setLoginStatus('success');

      const savedUser = await saveUserRoleCookie();

      setTimeout(() => {
        setIsLoggedIn(true);
      }, 1000);
    } catch (error) {
      setLoginStatus('error');
      setError('Usuario o contraseña incorrectos.');
    }
    router.push('/inicio');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded shadow">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Usuario
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Contraseña
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {loginStatus === 'error' && (
            <div className="mb-4 text-red-500 font-bold">{error}</div>
          )}
          <div className="flex items-center justify-between">
            <button
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                loginStatus === 'success' ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              type="submit"
              disabled={loginStatus === 'success'}
            >
              {loginStatus === 'success' ? 'Redirigiendo...' : 'Iniciar sesión'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;