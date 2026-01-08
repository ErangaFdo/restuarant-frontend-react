import React, { useState, useRef, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
// import fish from "../assets/icons8-fish-50.png"
// import delivery from "../assets/icons8-delivery-50.png"


interface UserType {
  name: string;
  role: string;
}

const DashboardLayout: React.FC = () => {
  // Replace this with your actual logged-in user from Context / API
  const user: UserType = {
    name: "Eranga Fernando",  // <-- replace with your login details
    role: "ADMIN",
  };

  const username = user?.name || "User";
  const firstLetter = username.charAt(0).toUpperCase();

  const [asideOpen, setAsideOpen] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);

  const profileRef = useRef<HTMLDivElement | null>(null);

  // close dropdown when clicking outside
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
    <main className="min-h-screen w-full bg-gray-00 text-gray-700">

      {/* HEADER */}
      <header className="flex w-full items-center justify-between border-b-2 border-gray-200 bg-sky-700 p-2">
        
        {/* Logo + Menu */}
        <div className="flex items-center space-x-2">
          <button className="text-3xl" onClick={() => setAsideOpen(!asideOpen)}>
            <i className="bx bx-menu text-white cursor-pointer"></i>
          </button>
          <div className="text-xl ml-5 text-white"> Golden Spoon Restaurant </div>
        </div>

        {/* Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="h-9 w-9 overflow-hidden rounded-full bg-gray-800 text-white flex items-center justify-center text-lg"
          >
            {firstLetter}
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-1 w-48 divide-y divide-gray-200 rounded-md border border-gray-200 bg-white shadow-md z-50">
              
              <div className="flex items-center space-x-2 p-2">
                <div className="h-9 w-9 rounded-full bg-gray-800 text-white flex items-center justify-center text-lg">
                  {firstLetter}
                </div>
                <div className="font-medium">{username}</div>
              </div>

              <div className="flex flex-col space-y-3 p-2">
                <a className="transition hover:text-blue-600" href="#">
                  My Profile
                </a>
                <a className="transition hover:text-blue-600" href="#">
                  Edit Profile
                </a>
                <a className="transition hover:text-blue-600" href="#">
                  Settings
                </a>
              </div>

              <div className="p-2">
                <button className="flex items-center space-x-2 transition hover:text-blue-600">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    ></path>
                  </svg>
                  <a href="/login">Log Out</a>
                </button>
              </div>

            </div>
          )}
        </div>
      </header>

      {/* BODY */}
      <div className="flex flex-1">

        {/* SIDEBAR */}
        {asideOpen && (
          <aside
            className="flex w-72 flex-col space-y-2 border-r-2 border-gray-200 bg-white p-2"
            style={{ height: "90.5vh" }}
          >
            <Link to="/admin/food" className="flex items-center space-x-1 text-xl rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600 cursor-pointer">
              {/* <span className="text-2xl"><img className="w-7.5" src={fish} alt="" /></span> */}
              <span className="ml-3"> Foods </span>
            </Link>


            <Link to="/admin/customers" className="flex items-center space-x-1 text-xl rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600 cursor-pointer">
              <span className="text-2xl"><i className="bx bx-user"></i></span>
              <span className="ml-3">Customers</span>
            </Link>

            
            <Link to="/admin/feedback" className="flex items-center space-x-1 text-xl rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600 cursor-pointer">
              <span className="text-2xl"> <i className="bx bx-message-dots text-2xl"></i> </span>
              <span className="ml-3">FeedBack</span>
            </Link>

            
            <Link to="/admin/orders" className="flex items-center space-x-1  text-xl rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600 cursor-pointer">
              <span className="text-2xl"><i className="bx bx-package text-2xl"></i></span>
              <span className="ml-3"> Orders</span>
            </Link>

            <Link to="/admin/delivery" className="flex items-center space-x-1  text-xl rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600 cursor-pointer">
              {/* <span className="text-2xl"><img className="w-7.5" src={delivery} alt="" /></span>               */}
              <span className="ml-3">Delivery</span>
            </Link>


            <Link to="/admin/payments" className="flex items-center space-x-1  text-xl rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600 cursor-pointer">
              <span className="text-2xl"><i className="bx bx-credit-card text-2xl"></i></span>
              <span className="ml-3">Payments</span>
            </Link>

            
          </aside>
        )}    

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>

      </div>
    </main>
  );
};

export default DashboardLayout;