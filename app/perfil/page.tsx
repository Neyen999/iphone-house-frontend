import { isTokenValid } from '@/lib/auth/auth.server';
import PerfilClient from '@/components/profile/PerfilClient';

const Perfil = async () => {
  const isValidToken = await isTokenValid();

  if (!isValidToken) {
    return null;
  }
  
  return (
    <PerfilClient />
  )

};

export default Perfil;
