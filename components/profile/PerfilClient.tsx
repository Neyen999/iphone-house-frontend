"use client";
import { useState, FormEvent } from 'react';
import { UserIcon, PencilIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Input from '../input/Input';
import { resetPassword } from '@/lib/auth/auth.service';

const PerfilClient = ({ user }: { user: UserDTO | undefined }) => {
  const [oldPassword, setOldPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [updateStatus, setUpdateStatus] = useState<'idle' | 'success' | 'error' | 'loading'>('idle');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    setUpdateStatus('loading');
    event.preventDefault();
    try {
      await resetPassword({ oldPassword, newPassword });
      setOldPassword('');
      setNewPassword('');
      setUpdateStatus('success');
    } catch (error) {
      setUpdateStatus('error');
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex flex-col w-full md:w-2/3">
        <div className="flex items-center mt-4 mb-8">
          <div className="relative mr-4">
            <div
              className="h-16 w-16 flex items-center justify-center rounded-full bg-gray-200 overflow-hidden relative"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {user?.image ? (
                <Image
                  src={user.image}
                  alt="User Avatar"
                  className="h-full w-full object-cover"
                  layout="fill"
                />
              ) : (
                <UserIcon className="h-8 w-8 text-gray-500" />
              )}
              {isHovered && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white rounded-full">
                  <button
                    type="button"
                    className="rounded-full p-2 text-gray-600 hover:text-gray-800"
                    onClick={() => console.log('Editar imagen')}
                  >
                    <PencilIcon className="h-6 w-6" />
                  </button>
                </div>
              )}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold">{user?.name} {user?.lastName}</h2>
            <p className="text-sm text-gray-500">{user?.username}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <div className="mb-4">
            <Input
              id='oldPassword'
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder='Ingrese su contraseña'
              type='password'
              label='Contraseña anterior'
              required
            />
          </div>
          <div className="mb-4">
            <Input
              id='newPassword'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder='Ingrese la nueva contraseña'
              type='password'
              label='Contraseña nueva'
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={updateStatus === 'loading'}
          >
            {updateStatus === 'loading' ? 'Actualizando...' : 'Actualizar Contraseña'}
          </button>
        </form>

        {updateStatus === 'success' && (
          <div className="mt-4 text-green-500">
            Contraseña actualizada con éxito.
          </div>
        )}
        {updateStatus === 'error' && (
          <div className="mt-4 text-red-500">
            Hubo un error al actualizar la contraseña.
          </div>
        )}
      </div>
    </div>
  );
};

export default PerfilClient;
