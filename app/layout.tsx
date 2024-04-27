import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { TokenExpiredModalWrapper } from "./components/session/sessionManager";
import ContextProvider from "./context/contextProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <ContextProvider>
          <TokenExpiredModalWrapper />
          {children}
        </ContextProvider>
      </body>
    </html>
  );
}
