"use client";
import Link from "next/link";
import NavLinks from "./NavLinks";
import { useAuth } from "@/context/context";
import { usePathname } from "next/navigation";
import Logo from '@/assets/Logo.png';
import Image from "next/image";

const SideNav = () => {
  const { handleLogout } = useAuth();
  const path = usePathname();

  // If the current path is '/login', do not render the SideNav
  if (path === "/login") {
    return null;
  }

  return (
    <div className="w-full flex-none md:w-64">
      <div className="flex h-full flex-col px-3 py-4 md:px-2">
        <Link
          className="mb-2 flex h-20 items-center justify-center rounded-md bg-gray-700 p-4 md:h-40"
          href="/productos"
        >
          <div className="relative h-full w-full flex items-center justify-center">
            <Image src={Logo} alt="logo" className="object-contain" fill />
          </div>
        </Link>
        <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
          <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block">
            <NavLinks />
          </div>
          <form>
            <button
              onClick={(e) => { e.preventDefault(); handleLogout(); }}
              className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
            >
              {/* <PowerIcon className="w-6" /> */}
              <div className="hidden md:block">Cerrar sesión</div>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
