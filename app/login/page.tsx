'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  //  saveUserRoleCookie, 
  loginUser } from '@/lib/auth/auth.service';
import { useAuth } from '@/context/context';
import Input from '@/components/input/Input';

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const { setIsLoggedIn } = useAuth();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUsername(value);

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setEmailError('Formato de email incorrecto');
    } else {
      setEmailError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (emailError) {
      setError('Corrija los errores antes de continuar.');
      return;
    }

    setLoginStatus('idle');
    setError('');

    const request: LoginRequest = { username, password };

    try {
      await loginUser(request);
      setLoginStatus('success');
      // await saveUserRoleCookie();

      setIsLoggedIn(true);
      router.push('/');
    } catch (error) {
      setLoginStatus('error');
      setError('Usuario o contraseña incorrectos.');
    }
  };


  return (
    <div className="flex items-center justify-center h-full min-h-full bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded shadow">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Input
              id='username'
              value={username}
              onChange={handleEmailChange}
              placeholder='Ingrese su correo electrónico'
              type='email'
              label='Correo electrónico'
              required
              error={emailError}
            />
          </div>
          <div className="mb-6">
            <Input
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Ingrese su contraseña'
              type='password'
              label='Contraseña'
              required
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