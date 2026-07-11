"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Image as ImageIcon, FileText, FileBox, LogOut, Video } from "lucide-react";
import toast from "react-hot-toast";

const SIDEBAR_ITEMS = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Gallery", href: "/admin/gallery", icon: ImageIcon },
  { name: "News", href: "/admin/news", icon: FileText },
  { name: "Publications", href: "/admin/publications", icon: FileBox },
  { name: "Videos", href: "/admin/videos", icon: Video },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    document.cookie = "admin_access=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    toast.success("Logged out successfully");
    window.location.href = "/en"; // Hard redirect so middleware re-evaluates cookies
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 bg-white border-r border-slate-200 h-screen sticky top-0 flex-col">
        <div className="p-6 border-b border-slate-100">
          <h1 className="text-xl font-bold text-imc-blue">IMC Admin</h1>
        </div>
        <nav className="p-4 space-y-2 flex-grow overflow-y-auto">
          {SIDEBAR_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.name} 
                href={item.href} 
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-imc-blue/10 text-imc-blue' : 'text-slate-600 hover:bg-slate-50 hover:text-imc-blue'}`}
              >
                <Icon size={20} /> 
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-slate-100">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 w-full rounded-lg transition-colors text-left font-medium"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-50 flex justify-around items-center px-4 py-3 pb-safe shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        {SIDEBAR_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.name} 
              href={item.href} 
              className={`flex items-center justify-center p-3 rounded-xl transition-all ${isActive ? 'bg-imc-blue text-white shadow-md' : 'text-slate-500 hover:text-imc-blue hover:bg-slate-50'}`}
              title={item.name}
            >
              <Icon size={24} className={isActive ? 'opacity-100' : 'opacity-80'} />
            </Link>
          );
        })}
        <button 
          onClick={handleLogout}
          className="flex items-center justify-center p-3 rounded-xl text-red-500 transition-all hover:bg-red-50"
          title="Logout"
        >
          <LogOut size={24} className="opacity-80" />
        </button>
      </div>
    </>
  );
}
