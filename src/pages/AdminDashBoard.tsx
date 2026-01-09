import React, { useState, useRef, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { 
  UtensilsCrossed, 
  Users, 
  MessageSquare, 
  Package, 
  Truck, 
  CreditCard, 
  Menu, 
  LogOut, 
  User as UserIcon, 
  Settings 
} from "lucide-react"; // Using Lucide for a modern, consistent look

interface UserType {
  name: string;
  role: string;
}

const DashboardLayout: React.FC = () => {
  const user: UserType = {
    name: "Eranga Fernando",
    role: "ADMIN",
  };

  const username = user?.name || "User";
  const firstLetter = username.charAt(0).toUpperCase();

  const [asideOpen, setAsideOpen] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);

  const profileRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <main className="min-h-screen w-full bg-[#F8F9FA] flex flex-col font-sans">
      
      {/* HEADER */}
      <header className="sticky top-0 z-60 flex w-full items-center justify-between bg-[#0A0A0A] px-6 py-3 shadow-lg shadow-black/10">
        
        {/* Logo + Menu */}
        <div className="flex items-center space-x-6">
          <button 
            className="p-2 hover:bg-white/10 rounded-lg transition-colors" 
            onClick={() => setAsideOpen(!asideOpen)}
          >
            <Menu className="text-orange-500" size={24} />
          </button>
          
          <div className="text-xl font-black tracking-tighter text-white italic">
            GOLDEN<span className="text-orange-500 font-light not-italic">SPOON</span>
            <span className="ml-2 text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 not-italic border-l border-white/20 pl-3">
              Admin Portal
            </span>
          </div>
        </div>

        {/* Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="group flex items-center space-x-3 p-1 pr-3 rounded-full bg-white/5 hover:bg-white/10 transition-all border border-white/10"
          >
            <div className="h-8 w-8 overflow-hidden rounded-full bg-linear-to-r from-orange-400 to-orange-600 text-white flex items-center justify-center font-bold shadow-inner">
              {firstLetter}
            </div>
            <span className="text-sm font-bold text-gray-300 group-hover:text-white transition-colors">{username}</span>
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-3 w-56 overflow-hidden rounded-2xl border border-white/10 bg-[#121212] shadow-2xl z-50 ring-1 ring-black animate-in fade-in zoom-in duration-200">
              <div className="bg-white/5 p-4 flex items-center space-x-3">
                <div className="h-10 w-10 rounded-xl bg-orange-500 text-white flex items-center justify-center font-black">
                  {firstLetter}
                </div>
                <div>
                  <div className="text-sm font-bold text-white">{username}</div>
                  <div className="text-[10px] font-bold text-orange-500 uppercase tracking-widest">{user.role}</div>
                </div>
              </div>

              <div className="p-2 space-y-1">
                <button className="w-full flex items-center space-x-3 p-3 text-sm font-medium text-gray-400 hover:bg-white/5 hover:text-white rounded-xl transition-all">
                  <UserIcon size={16} /> <span>My Profile</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-sm font-medium text-gray-400 hover:bg-white/5 hover:text-white rounded-xl transition-all">
                  <Settings size={16} /> <span>Settings</span>
                </button>
              </div>

              <div className="p-2 border-t border-white/5">
                <a 
                  href="/login" 
                  className="w-full flex items-center space-x-3 p-3 text-sm font-bold text-red-400 hover:bg-red-500/10 rounded-xl transition-all"
                >
                  <LogOut size={16} /> <span>Sign Out</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* BODY CONTAINER */}
      <div className="flex flex-1 overflow-hidden">

        {/* SIDEBAR */}
        <aside
          className={`
            fixed lg:relative z-50 flex flex-col transition-all duration-300 ease-in-out border-r border-gray-200 bg-white
            ${asideOpen ? "w-72 opacity-100 translate-x-0" : "w-0 opacity-0 -translate-x-full lg:translate-x-0 lg:hidden"}
          `}
          style={{ height: "calc(100vh - 64px)" }}
        >
          <nav className="flex-1 space-y-2 p-4 overflow-y-auto custom-scrollbar">
            
            <SidebarLink to="/admin/food" icon={<UtensilsCrossed size={20}/>} label="Food Menu" />
            <SidebarLink to="/admin/customers" icon={<Users size={20}/>} label="Customers" />
            <SidebarLink to="/admin/feedback" icon={<MessageSquare size={20}/>} label="Feedback" />
            <SidebarLink to="/admin/orders" icon={<Package size={20}/>} label="Orders" />
            <SidebarLink to="/admin/delivery" icon={<Truck size={20}/>} label="Delivery" />
            <SidebarLink to="/admin/payments" icon={<CreditCard size={20}/>} label="Payments" />

          </nav>

          <div className="p-4 border-t border-gray-100">
            <div className="bg-orange-50 p-4 rounded-2xl">
              <p className="text-[10px] font-black text-orange-600 uppercase tracking-[0.2em] mb-1">Status</p>
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-xs font-bold text-gray-600">Kitchen Online</span>
              </div>
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 overflow-y-auto bg-[#F8F9FA] p-8 lg:p-10">
          <div className="max-w-7xl mx-auto">
             <Outlet />
          </div>
        </main>

      </div>
    </main>
  );
};

// Helper component for Sidebar Links to keep code clean
const SidebarLink = ({ to, icon, label }: { to: string, icon: React.ReactNode, label: string }) => {
  const isActive = window.location.pathname === to; // Simplified check
  
  return (
    <Link 
      to={to} 
      className={`
        flex items-center space-x-4 px-4 py-3.5 rounded-2xl transition-all group
        ${isActive 
          ? "bg-[#0A0A0A] text-white shadow-lg shadow-black/10" 
          : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"}
      `}
    >
      <span className={`${isActive ? "text-orange-500" : "text-gray-400 group-hover:text-orange-500"} transition-colors`}>
        {icon}
      </span>
      <span className="font-bold text-sm tracking-tight">{label}</span>
    </Link>
  );
};

export default DashboardLayout;