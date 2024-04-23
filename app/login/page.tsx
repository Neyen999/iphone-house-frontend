'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getLoggedUser, loginUser } from '@/lib/auth.service';

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoginStatus('idle');
    setErrorMessage('');

    const request: LoginRequest = { username, password };

    try {
      await loginUser(request);
      setLoginStatus('success');

      const loggedUser = await getLoggedUser();

      // Simulate a delay of 1 second before redirecting
      setTimeout(() => {
        router.push('/inicio');
      }, 1000);
      // router.push('/')
    } catch (error) {
      // console.error('Login error:', error);
      setLoginStatus('error');
      setErrorMessage('Usuario o contraseña incorrectos.');
    }
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
            <div className="mb-4 text-red-500 font-bold">{errorMessage}</div>
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