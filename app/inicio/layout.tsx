import SideNav from "../components/nav/SideNav";
import { TokenExpiredModalWrapper } from "../components/session/sessionManager";
import TokenExpiredModal from "../components/session/tokenExpired";
import ContextProvider from "../context/contextProvider";

export default function HomeLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        {/* <ContextProvider> */}
        <SideNav />
        {/* <TokenExpiredModal /> */}
        <TokenExpiredModalWrapper />
        {/* </ContextProvider> */}
        
      </div>
      <div className="flex-grow p-3 md:overflow-y-auto md:p-4">{children}</div>
    </div>
  )
}