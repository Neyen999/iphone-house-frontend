"use client";

import SideNav from "../components/nav/SideNav";
// import { TokenExpiredModalWrapper } from "../components/session/sessionManager";
// import TokenExpiredModal from "../components/session/tokenExpired";
import { useAuth } from "../context/context";
import ContextProvider from "../context/contextProvider";

export default function HomeLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  const { isLoading } = useAuth();
  
  // return (
  //   <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
  //     <div className="w-full flex-none md:w-64">
  //       {/* <ContextProvider> */}
  //       <SideNav />
  //       <TokenExpiredModal />
  //       {/* <TokenExpiredModalWrapper /> */}
  //       {/* </ContextProvider> */}
        
  //     </div>
  //     <div className="flex-grow p-3 md:overflow-y-auto md:p-4">{children}</div>
  //   </div>
  // )
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        {/* Render SideNav and TokenExpiredModal only when not loading */}
        {!isLoading && (
          <>
            <SideNav />
            {/* <TokenExpiredModal /> */}
          </>
        )}
      </div>
      <div className="flex-grow p-3 md:overflow-y-auto md:p-4">
        {/* Render either loading indicator or main content based on isLoading */}
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-xl font-bold">Loading...</p>
          </div>
        ) : (
         children 
        )}
      </div>
    </div>
  )
}