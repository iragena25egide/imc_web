import { Libre_Franklin } from "next/font/google";
import "../globals.css";
import { Toaster } from 'react-hot-toast';
import Sidebar from "@/components/admin/Sidebar";
import SessionGuard from "@/components/admin/SessionGuard";

const libreFranklin = Libre_Franklin({
  variable: "--font-libre-franklin",
  subsets: ["latin"],
});

export const metadata = {
  title: "Admin Dashboard | IMC Rwanda",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${libreFranklin.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col md:flex-row font-sans bg-slate-50">
        <SessionGuard />
        <Sidebar />
        <main className="flex-1 p-4 md:p-8 overflow-y-auto mb-16 md:mb-0">
          {children}
        </main>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
