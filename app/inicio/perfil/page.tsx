"use client";
import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { useAuth } from '@/app/context/context';
import { PencilIcon, UserIcon } from '@heroicons/react/24/outline';
import { user_sales as userSales, user_repairs as userReparations } from '@/lib/data';
import UserActivity from '@/app/components/user/userActivity';
import Image from 'next/image';
import { mapRepairsToActivities, mapSalesToActivities } from '@/lib/mappers/activityMapper';

const Profile = () => {
  const { user } = useAuth();
  const [oldPassword, setOldPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [isHovered, setIsHovered] = useState<boolean>(false);

  useEffect(() => {
    console.log("User get loaded: ", user);
    console.log("Image URL: ", user?.image);
  }, [user]);

  const handleOldPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setOldPassword(event.target.value);
  };

  const handleNewPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewPassword(event.target.value);
  };

  const handleSubmit = (event : FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Aquí podrías enviar los datos del formulario a tu backend para procesar la actualización de la contraseña
    console.log('Old Password:', oldPassword);
    console.log('New Password:', newPassword);
    // Luego podrías limpiar los campos del formulario si lo deseas
    setOldPassword('');
    setNewPassword('');
  };

  return (
    <div className="flex flex-col md:flex-row">
      {/* Columna izquierda: perfil de usuario */}
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
            <h2 className="text-2xl font-bold">{user?.name}</h2>
            <p className="text-sm text-gray-500">{user?.username}</p>
          </div>
        </div>

        {/* Formulario de actualización de contraseña */}
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <div className="mb-4">
            <label htmlFor="oldPassword" className="block text-gray-700 font-bold mb-2">
              Contraseña anterior
            </label>
            <input
              type="password"
              id="oldPassword"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={oldPassword}
              onChange={handleOldPasswordChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="newPassword" className="block text-gray-700 font-bold mb-2">
              Nueva contraseña
            </label>
            <input
              type="password"
              id="newPassword"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={newPassword}
              onChange={handleNewPasswordChange}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Actualizar Contraseña
          </button>
        </form>
      </div>

      {/* Columna derecha: historial de ventas y reparaciones */}
      <div className="flex flex-col w-full md:w-1/3">
          {/* Historial de ventas */}
          <UserActivity activityType="sales" activityData={mapSalesToActivities(userSales)} />

          {/* Historial de reparaciones */}
          <UserActivity activityType="reparations" activityData={mapRepairsToActivities(userReparations)} />
      </div>
    </div>
  );

};

export default Profile;
