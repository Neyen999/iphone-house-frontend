import { isTokenValid } from '@/lib/auth/auth.server';
import PerfilClient from '@/components/profile/PerfilClient';
import { getUser } from '@/lib/auth/auth.service';

const Perfil = async () => {
  const { isValid } = await isTokenValid();

  if (!isValid) {
    return null;
  }
  
  const user = await getUser();
  
  return (
    <PerfilClient user={user} />
  )

};

export default Perfil;
