import React, { useState, useRef, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";

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
    <main className="min-h-screen w-full bg-[#0f0f0f] text-gray-200">

      {/* HEADER */}
      <header className="flex items-center justify-between border-b border-[#2a2a2a] bg-[#141414] px-6 py-3">
        <div className="flex items-center gap-4">
          <button onClick={() => setAsideOpen(!asideOpen)}>
            <i className="bx bx-menu text-2xl text-yellow-400"></i>
          </button>
          <h1 className="text-xl font-bold tracking-wide text-yellow-400">
            Golden Spoon Restaurant
          </h1>
        </div>

        {/* Profile */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="h-10 w-10 rounded-full bg-yellow-400 text-black font-bold flex items-center justify-center"
          >
            {firstLetter}
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-3 w-52 rounded-lg bg-[#1c1c1c] shadow-xl border border-[#333]">
              <div className="flex items-center gap-3 p-4 border-b border-[#333]">
                <div className="h-10 w-10 rounded-full bg-yellow-400 text-black flex items-center justify-center font-bold">
                  {firstLetter}
                </div>
                <div>
                  <p className="font-semibold">{username}</p>
                  <p className="text-sm text-gray-400">{user.role}</p>
                </div>
              </div>

              <div className="flex flex-col p-3 text-sm">
                <a className="py-2 hover:text-yellow-400">My Profile</a>
                <a className="py-2 hover:text-yellow-400">Settings</a>
                <a href="/login" className="py-2 text-red-400 hover:text-red-500">
                  Logout
                </a>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* BODY */}
      <div className="flex">

        {/* SIDEBAR */}
        {asideOpen && (
          <aside className="w-64 bg-[#141414] border-r border-[#2a2a2a] min-h-[calc(100vh-64px)] p-4 space-y-2">

            <SidebarItem to="/admin/fishes" icon="bx-restaurant" label="Foods" />
            <SidebarItem to="/admin/customers" icon="bx-user" label="Customers" />
            <SidebarItem to="/admin/orders" icon="bx-receipt" label="Orders" />
            <SidebarItem to="/admin/delivery" icon="bx-package" label="Delivery" />
            <SidebarItem to="/admin/payments" icon="bx-credit-card" label="Payments" />
            <SidebarItem to="/admin/feedback" icon="bx-message-dots" label="Feedback" />

          </aside>
        )}

        {/* CONTENT */}
        <main className="flex-1 p-6 bg-[#0f0f0f]">
          <Outlet />
        </main>
      </div>
    </main>
  );
};

const SidebarItem = ({
  to,
  icon,
  label,
}: {
  to: string;
  icon: string;
  label: string;
}) => (
  <Link
    to={to}
    className="flex items-center gap-4 rounded-lg px-4 py-3 text-gray-300 hover:bg-yellow-400/10 hover:text-yellow-400 transition"
  >
    <i className={`bx ${icon} text-xl`}></i>
    <span className="font-medium">{label}</span>
  </Link>
);

export default DashboardLayout;
