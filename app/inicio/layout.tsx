"use client";

import SideNav from "../components/nav/SideNav";
import { useAuth } from "../context/context";

export default function HomeLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  const { isLoading } = useAuth();
  
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      {
        !isLoading &&
        <div className="w-full flex-none md:w-64">
        {/* Render SideNav and TokenExpiredModal only when not loading */}
          <>
            <SideNav />
            {/* <TokenExpiredModal /> */}
          </>
      </div>
      }
      <div className="flex-grow p-3 md:overflow-y-auto md:p-4">
        {/* Render either loading indicator or main content based on isLoading */}
        {isLoading ? (
          <div className="flex items-center justify-center h-full w-full">
            <p className="text-xl font-bold">Loading...</p>
          </div>
        ) : (
         children 
        )}
      </div>
    </div>
  )
}